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
    { url: "media/tide-keeper.mp4", thumb: "media/tide-keeper.jpg", title: "The Tide Keeper", description: "Phim hoạt hình ngắn phong cách vẽ tay: lúc bình minh, một người khổng lồ cổ xưa phủ đầy san hô thức giấc dưới đáy biển và trồi lên qua làn nước vào buổi sáng vàng rực.", category: "Hoạt hình", date: "2026-11-11", duration: "1:20", featured: true },
  ],
};
