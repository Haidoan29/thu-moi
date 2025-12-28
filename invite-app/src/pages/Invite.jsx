// src/pages/Invite.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Invite() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "invites", id));
      if (snap.exists()) {
        setData(snap.data());
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải thiệp mời...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* WRAPPER */}
      <div className="relative w-full max-w-md sm:max-w-lg">
        {/* ẢNH NỀN */}
        <img
          src='https://res.cloudinary.com/dgvpgsujg/image/upload/v1766940309/invites/ynehhfljdugndmjb1a0x.jpg'
          alt="Thiệp mời"
          className="w-full h-auto rounded-lg"
        />
        

        {/* NỘI DUNG ĐÈ LÊN ẢNH */}
        <div className="
          absolute inset-0
          flex flex-col items-center
          text-center
          text-yellow-300
          px-6
          pt-[38%]
          sm:pt-[40%]
        ">
          {/* TIÊU ĐỀ */}
          <h2 className="text-lg sm:text-xl font-semibold tracking-widest drop-shadow-lg">
            NGHI LỄ HẦU ĐỒNG
          </h2>

          <p className="text-xs sm:text-sm mt-1 tracking-wide drop-shadow">
            TÍN NGƯỠNG TAM TỨ PHỦ
          </p>

          {/* KHỐI THÔNG TIN */}
          <div className="mt-6 text-sm sm:text-base leading-relaxed drop-shadow">
            <p>
              <span className="font-semibold">Đồng thầy:</span>{" "}
              {data.master || "Lê Thúy"}
            </p>

            <p>
              <span className="font-semibold">Đệ tử:</span>{" "}
              {data.name}
            </p>

            <p>
              <span className="font-semibold">Dâng văn:</span>{" "}
              {data.offer || "—"}
            </p>
          </div>

          <div className="mt-6 text-sm sm:text-base leading-relaxed drop-shadow">
            <p>
              <span className="font-semibold">Tại đền:</span>{" "}
              {data.temple || "—"}
            </p>

            <p>
              <span className="font-semibold">Thời gian:</span>{" "}
              {data.time || "—"}
            </p>

            <p>
              <span className="font-semibold">Địa chỉ:</span>{" "}
              {data.address || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
