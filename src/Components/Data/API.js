import axios from "axios";

export async function GetFilterData() {
  console.log("GETFILTERDATA");

  const res = await axios.get(`/get_filter_data`);
  return await res.data;
}

export async function UploadFile({ idToken, data }) {
  const options = {
    headers: {
      Authorization: idToken,
    },
  };

  const finalData = new FormData();
  for (const property in data) {
    if (property === "files") {
      finalData.append("file", data[property][0]);
    } else {
      finalData.append(property, data[property]);
    }
  }
  finalData.append("token", idToken);

  return await axios.post(`/upload_file`, finalData, options);
}
