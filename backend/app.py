from pathlib import Path
from flask import Flask, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from functools import lru_cache

try:
    from security import verify_token
    from aws_operations import backup_file_to_s3, get_s3path, create_presigned_url
    from files import get_upload_dir
    from graphql import execute_graphql_query
except:
    from .security import verify_token
    from .aws_operations import backup_file_to_s3, get_s3path, create_presigned_url
    from .files import get_upload_dir
    from .graphql import execute_graphql_query

APP = Flask("maktabti")
CORS(APP)
Limiter(APP, key_func=get_remote_address, default_limits=["10000 per minute"])
APP.config["CORS_HEADERS"] = "Content-Type"
APP.config["MAX_CONTENT_LENGTH"] = 20 * 1024 * 1024

UPLOAD_FOLDER = get_upload_dir()
ALLOWED_EXTENSIONS = set([".pdf", ".zip", ".rar"])
PREFIX = "/api"


@APP.route(f"{PREFIX}/upload_file", methods=["POST"])
def upload_file():
    data = dict(request.form)

    id_token = data["token"]

    claims = verify_token(id_token)
    if claims is None:
        return "f", 401

    data["created_by"] = claims["sub"]
    data["username"] = claims["name"]

    if data["college"] == "0":
        data["college"] = data["major"] = "null"
    elif data["major"] == "0":
        data["major"] = "null"

    query = """
    mutation MyMutation {
        insert_files_one(
            object: {
                    name: "%(name)s",
                    courseByCourse: {data: {name: "%(course)s", university: %(university)s, college: %(college)s, major: %(major)s}, on_conflict: {constraint: courses_name_major_college_university_key, update_columns: major}},
                    created_by: "%(created_by)s",
                    username: "%(username)s",
                    kind: %(kind)s,
                    year: %(year)s
            }
        )
        {
            id
        }
    }
    """ % (
        data
    )

    res = execute_graphql_query(query)

    if "data" not in res.keys():
        print(res)
        return res, 500

    original_filename = Path(data["filename"])
    extension = original_filename.suffix
    if extension not in ALLOWED_EXTENSIONS:
        return "f", 500

    id_ = res["data"]["insert_files_one"]["id"]
    file_name = f"{id_}{extension}"
    full_path = UPLOAD_FOLDER / file_name
    file = request.files["file"]
    file.save(full_path)
    file.close()

    backup_file_to_s3(full_path, file_name)

    link = get_s3path(file_name)

    query = """
    mutation MyMutation {
        update_files_by_pk(pk_columns: {id: %s}, _set: {link: "%s"}) {
            link
        }
    }


    """ % (
        id_,
        link,
    )

    res = execute_graphql_query(query)

    if "data" not in res.keys():
        print(res)
        return res, 500

    return "s", 200


@APP.route(f"{PREFIX}/get_filter_data", methods=["GET"])
def get_filter_data():
    query = """
    query MyQuery {
        universities {
            id
            name
            colleges {
                id
                name
                majors {
                    id
                    name
                    courses {
                        id
                        name
                    }
                }
                courses(where: {major: {_is_null: true}, _and: {college: {_is_null: false}}}) {
                    id
                    name
                }
            }
            courses(where: {college: {_is_null: true}}) {
                id
                name
            }
        }
        kinds {
            id
            name
        }
    }
    """

    res = execute_graphql_query(query)
    if "data" in res.keys():
        return res["data"]

    return res, 500


@APP.route(f"{PREFIX}/get_search_results/<course>/<page>", methods=["GET"])
def get_search_results(course, page):
    where = "course: {_eq: %s}" % course
    page = int(page)

    query = """
    query MyQuery {
        files(where: {%s}, limit: 10, offset: %d) {
            id
            name
            courseByCourse {
                name
            }
            kindByKind {
                name
            }
            link
            username
        }
        files_aggregate(where: {%s}) {
            aggregate {
                totalCount: count
            }
        }
    }
    """ % (
        where,
        (page - 1) * 10,
        where,
    )
    # variables = {"kind": int(kind)}

    res = execute_graphql_query(query)

    if "data" in res.keys():
        return res["data"]

    return res, 500


@APP.route(f"{PREFIX}/get_stats", methods=["GET"])
def get_stats():
    query = """
        query MyQuery {
            users_aggregate {
                aggregate {
                    count(distinct: false, columns: identifier)
                }
            }
            
            files_aggregate {
                aggregate {
                    count
                }
            }
            courses_aggregate {
                aggregate {
                    count
                }
            }
            files(order_by: {downloads_aggregate: {count: desc_nulls_last}}, limit: 1) {
                name
                course : courseByCourse{
                    name
                    university : universityByUniversity{
                        name
                    }
                }
                
                downloads : downloads_aggregate{
                    aggregate {
                        count
                    }
                }
                id
                link

            }
            top_majors(limit: 1) {
                name
                count
                College {
                    university : universityByUniversity {
                        name
                    }
                }
            }
            top_courses(limit: 1) {
                count
                name
                course {
                    majorByMajor {
                        collegeByCollege {
                            universityByUniversity {
                                name
                            }
                        }
                    }
                }
            }
        }
    """

    res = execute_graphql_query(query)

    if "data" in res.keys():
        try:
            md_file = res["data"]["files"][0]
            md_file = {
                "name": md_file["name"],
                "course_name": md_file["course"]["name"],
                "university": md_file["course"]["university"]["name"],
                "count": md_file["downloads"]["aggregate"]["count"],
                "link": md_file["link"],
                "id": md_file["id"],
            }
        except:
            md_file = {
                "name": None,
                "course_name": None,
                "university": None,
                "count": 0,
                "link": None,
                "id": None,
            }
        try:
            md_major = res["data"]["top_majors"][0]
            md_major = {
                "name": md_major["name"],
                "university": md_major["College"]["university"]["name"],
                "count": md_major["count"],
            }
        except:
            md_major = {
                "name": None,
                "university": None,
                "count": 0,
            }

        try:
            md_course = res["data"]["top_courses"][0]
            md_course = {
                "name": md_course["name"],
                "university": md_course["course"]["majorByMajor"]["collegeByCollege"][
                    "universityByUniversity"
                ]["name"],
                "count": md_course["count"],
            }
        except:
            md_course = {
                "name": None,
                "university": None,
                "count": 0,
            }

        return {
            "file_count": res["data"]["files_aggregate"]["aggregate"]["count"],
            "course_count": res["data"]["courses_aggregate"]["aggregate"]["count"],
            "student_count": res["data"]["users_aggregate"]["aggregate"]["count"],
            "top_file": md_file,
            "top_major": md_major,
            "top_course": md_course,
        }, 200

    return "f", 500


@APP.route(f"{PREFIX}/set_download", methods=["POST"])
def set_download():
    data = dict(request.form)
    file_id = data["file_id"]

    id_token = data["token"]
    s3path = data["link"]

    if id_token:
        claims = verify_token(id_token)
        if claims is None:
            return "f", 401
        user = claims["sub"]
    else:
        user = request.remote_addr

    query = """
        mutation MyMutation {
            insert_downloads_one(object: {file: %s, user: "%s"}){
                id
            }
        }
    """ % (
        file_id,
        user,
    )

    res = execute_graphql_query(query)

    if "data" in res.keys():
        return {"url": create_presigned_url(s3path)}, 200

    return "f", 500


@APP.route(f"{PREFIX}/get_details/<file_id>", methods=["GET"])
def get_details(file_id):
    query = """
    query MyQuery {
    files(where: {id: {_eq: %s}}) {
            id
            year
            username
            link
            name
            courseByCourse {
                name
                collegeByCollege {
                    name
                }
                majorByMajor {
                    name
                }
                universityByUniversity {
                    name
                }
            }
            
            kindByKind {
                name
            }
            created_at
        }
    }
    """ % (
        file_id
    )

    res = execute_graphql_query(query)

    if "data" in res.keys():
        return res["data"], 200

    return "f", 500


@APP.route(f"{PREFIX}/report_file", methods=["POST"])
def report_file():
    data = dict(request.form)
    file_id = data["file_id"]
    id_token = data["token"]

    if id_token:
        claims = verify_token(id_token)
        if claims is None:
            return "f", 401
        user = claims["sub"]
    else:
        user = request.remote_addr

    query = """
    mutation MyMutation {
        insert_reports_one(object: {file: %s, created_by: "%s"}) {
            id
        }
    }
    """ % (
        file_id,
        user,
    )

    res = execute_graphql_query(query)

    if "data" in res.keys():
        return res["data"], 200

    return "f", 500


@APP.route(f"{PREFIX}/search", methods=["POST"])
def search_text():
    data = dict(request.form)
    page = int(data["page"])
    text = data["query"]
    query = """
    query MyQuery {
        search_files(args: {pattern: "%s"}, limit: 10, offset: %d) {
            id
            name
            courseByCourse {
                name
            }
            kindByKind {
                name
            }
            link
            username
        }
        search_files_aggregate(args: {pattern: "%s"}) {
            aggregate {
                count
            }
        }
    }
    """ % (
        text,
        (page - 1) * 10,
        text,
    )

    res = execute_graphql_query(query)
    if "data" in res.keys():
        return res["data"]

    print(res)

    return res, 500
