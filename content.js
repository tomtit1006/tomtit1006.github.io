/*
  TOÀN BỘ NỘI DUNG CỦA TRANG NẰM TRONG FILE NÀY.
  Muốn đăng video mới: thêm một mục vào đầu danh sách `videos`.

  Mỗi video:
    url         Link YouTube / YouTube Shorts / TikTok (trang tự nhận dạng),
                hoặc đường dẫn file .mp4 đặt trong thư mục media/
    title       Tiêu đề
    description Mô tả ngắn (không bắt buộc)
    category    Nhóm, dùng cho bộ lọc (ví dụ "Tài liệu", "Shorts")
    date        Ngày đăng, dạng YYYY-MM-DD
    duration    Thời lượng, ví dụ "8:42" (không bắt buộc)
    featured    true = hiện ở đầu trang (chỉ nên có 1 video)
    vertical    true = video dọc 9:16 (Shorts và TikTok tự nhận, không cần ghi)
    thumb       Ảnh bìa riêng (không bắt buộc; YouTube tự lấy ảnh bìa)
*/
window.SITE = {
  profile: {
    name: "Tên của bạn",
    role: "Nhà sáng tạo video",
    tagline: "Tôi kể những câu chuyện khó bằng hình ảnh dễ hiểu.",
    bio: [
      "Đây là đoạn giới thiệu mẫu. Hãy cho tôi biết bạn là ai, bạn làm loại video gì và cho ai xem, tôi sẽ viết lại phần này.",
      "Đoạn thứ hai có thể nói về cách bạn làm việc, công cụ bạn dùng, hoặc những dự án bạn muốn nhận.",
    ],
    avatar: "", // ví dụ "media/avatar.jpg"
    location: "Việt Nam",
    email: "", // để trống thì nút email không hiện
    socials: [
      // { label: "YouTube", url: "https://youtube.com/@kenh-cua-ban" },
      // { label: "TikTok", url: "https://tiktok.com/@ten-cua-ban" },
      // { label: "Facebook", url: "https://facebook.com/ten-cua-ban" },
    ],
    stats: [
      // { value: "120+", label: "video đã đăng" },
      // { value: "1,2 triệu", label: "lượt xem" },
    ],
  },

  videos: [
    // Các mục bên dưới là video MẪU (chưa có link). Sẽ được thay bằng video thật.
    { title: "Video nổi bật của bạn sẽ nằm ở đây", description: "Video bạn tự hào nhất, đặt ở đầu trang để người xem thấy ngay.", category: "Tài liệu", date: "2026-11-01", duration: "8:42", featured: true },
    { title: "Video mẫu số 2", description: "Mô tả ngắn một dòng về nội dung video.", category: "Tài liệu", date: "2026-10-20", duration: "12:05" },
    { title: "Video mẫu số 3", description: "Mô tả ngắn một dòng về nội dung video.", category: "Giải thích", date: "2026-10-08", duration: "6:30" },
    { title: "Video mẫu số 4", description: "Mô tả ngắn một dòng về nội dung video.", category: "Giải thích", date: "2026-09-21", duration: "9:14" },
    { title: "Short mẫu số 1", category: "Shorts", date: "2026-10-28", duration: "0:45", vertical: true },
    { title: "Short mẫu số 2", category: "Shorts", date: "2026-10-15", duration: "0:58", vertical: true },
    { title: "Short mẫu số 3", category: "Shorts", date: "2026-10-02", duration: "0:37", vertical: true },
    { title: "Short mẫu số 4", category: "Shorts", date: "2026-09-18", duration: "0:52", vertical: true },
  ],
};
