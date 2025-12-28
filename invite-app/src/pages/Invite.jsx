// src/pages/Invite.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Invite.css";

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
      <div className="invite-loading">
        Đang tải thiệp mời...
      </div>
    );
  }

  return (
    <div className="invite-page">
      <div className="invite-wrapper">
        {/* Ảnh nền */}
        <img
          src="https://res.cloudinary.com/dgvpgsujg/image/upload/v1766940309/invites/ynehhfljdugndmjb1a0x.jpg"
          alt="Thiệp mời"
          className="invite-bg"
        />

        {/* Nội dung đè lên ảnh */}
        <div className="invite-content">
          <h2 className="invite-title">
            NGHI LỄ HẦU ĐỒNG
          </h2>

          <p className="invite-subtitle">
            TÍN NGƯỠNG TAM TỨ PHỦ
          </p>

          <div className="invite-block">
            <p><b>Đồng thầy:</b> Lê Thuý</p>
            <p><b>Đệ tử:</b> Ngọcc Ánhh</p>
            <p><b>Dâng văn:</b> {data.offer || "Tâm Đen - cùng dàn nhạc"}</p>
          </div>

          <div className="invite-block">
            <p>
              <b>Tại đền:</b> Đền Đức Thánh Cả Ninh Bình (ngay núi Cánh Diều)
            </p>
            <p>
              <b>Thời gian:</b> 13h00 – 15/11/2025 (tức 03/01/2026)
            </p>
            <p>
              <b>Địa chỉ:</b> Phường Hoa Lư, Tỉnh Ninh Bình
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
