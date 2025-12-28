import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const CLOUD_NAME = "dgvpgsujg";
const UPLOAD_PRESET = "invite_unsigned";

export default function CreateInvite() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Upload ảnh lên Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "invites");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Upload failed");

    return data.secure_url;
  };

  const handleCreate = async () => {
    if (loading) return;

    if (!name.trim() || !file) {
      alert("Vui lòng nhập tên và chọn ảnh");
      return;
    }

    setLoading(true);
    setCopied(false);

    try {
      const id = Date.now().toString();

      // 1️⃣ Upload ảnh
      const imageUrl = await uploadToCloudinary(file);

      // 2️⃣ Lưu Firestore
      await setDoc(doc(db, "invites", id), {
        name: name.trim(),
        imageUrl,
        createdAt: Date.now(),
      });

      // 3️⃣ Tạo link invite
      const inviteLink = `${window.location.origin}/invite/${id}`;
      setLink(inviteLink);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Tạo thiệp mời</h2>

      <input
        placeholder="Tên người được mời"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
      <br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />

      <button
        onClick={handleCreate}
        disabled={loading}
        style={{ width: "100%", padding: 10 }}
      >
        {loading ? "Đang tạo..." : "Tạo link mời"}
      </button>

      {/* ✅ HIỂN THỊ LINK SAU KHI TẠO THÀNH CÔNG */}
      {link && (
        <div style={{ marginTop: 20 }}>
          <p><b>🎉 Link mời của bạn:</b></p>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={link}
              readOnly
              style={{ flex: 1, padding: 8 }}
            />
            <button onClick={handleCopy}>Copy</button>
          </div>

          {copied && (
            <p style={{ color: "green", marginTop: 5 }}>
              ✔ Đã copy link
            </p>
          )}
        </div>
      )}
    </div>
  );
}
