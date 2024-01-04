import { useState, useEffect } from "react";
import axios from "axios";

export default function TourSpotInfo() {
  const [searchText, setSearchText] = useState("");
  const [tourInfo, setTourInfo] = useState([]);
  console.log(searchText);

  useEffect(() => {
    getInfo(searchText);
  }, [searchText]);

  const getInfo = async (text) => {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${text}`
    );
    setTourInfo(response.data.data);
  };

  console.log(tourInfo);
  return (
    <div class="flex flex-col align-center">
      <div class="flex flex-col self-center p-5 w-4/5">
        <p>ค้นหาที่เที่ยว</p>
        <input
          class="flex border-2 justify-center"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {tourInfo.map((value) => (
        <div
          key={value.eid}
          class="flex m-10 self-center justify-center w-4/5 h-4/5"
        >
          <img
            class="w-2/5 h-2/5 rounded-3xl"
            src={value.photos[0]}
            alt="big image"
          />
          <div class="w-4/5">
            <h3>
              <a class="font-bold text-3xl m-5 flex" href={value.url}>
                {value.title}
              </a>
            </h3>
            <div class="m-5">
              <p>{`${value.description.substr(0, 100)} ...`}</p>
              <a class="text-blue-400" href={value.url}>
                อ่านต่อ
              </a>
            </div>

            {value.tags.map((value, index) => (
              <a
                key={index}
                class="underline m-5"
                onClick={() => setSearchText(searchText + value + " ")}
              >
                {value}
              </a>
            ))}
            <div class="flex justify-center m-10">
              {value.photos.slice(1).map((value, index) => (
                <img
                  class="m-10 rounded-3xl w-1/4"
                  key={index}
                  src={value}
                  alt="small images"
                />
              ))}
              <button
                class="self-end"
                onClick={() => navigator.clipboard.writeText(value.url)}
              >
                this button is blue
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
