🔹 Roadmap for WebSocket-based Live Chat with Admin Panel
1️⃣ Backend (Node.js + Express + Socket.io)
✅ Express server yaradın
✅ Socket.io quraşdırın və konfiqurasiya edin
✅ İstifadəçilərdən gələn mesajları qəbul edin
✅ Mesajları admin panelə yönləndirin
✅ Mesajları müvəqqəti saxlamaq üçün array və ya Redis kimi in-memory storage istifadə edin (opsional)

2️⃣ Frontend (React - Chat Panel)
✅ React komponenti yaradın (Mesaj yazmaq və göstərmək üçün)
✅ Socket.io ilə serverə qoşulun
✅ İstifadəçi mesaj yazanda serverə göndərin
✅ Admin paneldən gələn mesajları qəbul edin

3️⃣ Admin Panel (React - Message Monitor)
✅ Ayrı bir URL və ya ayrıca app olaraq yaradın
✅ Socket.io ilə serverə qoşulun və mesajları real-time olaraq qəbul edin
✅ Mesajları siyahı şəklində göstərin

4️⃣ Deployment
✅ Backend-i Railway, Render və ya VPS-də host edin
✅ Frontend və Admin paneli Netlify və ya Vercel-də yerləşdirin
✅ WebSocket bağlantılarını serverin URL-nə uyğun konfiqurasiya edin