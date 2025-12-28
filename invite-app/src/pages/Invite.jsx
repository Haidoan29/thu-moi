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
      if (snap.exists()) setData(snap.data());
    };
    fetchData();
  }, [id]);

  if (!data) return <p>Đang tải...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Trân trọng kính mời</h2>
      <h1>{data.name}</h1>
      <img src={data.imageUrl} style={{ maxWidth: "100%" }} />
    </div>
  );
}
