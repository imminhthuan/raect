import React, { useRef, useEffect, useState } from 'react';
import Fireworks from 'fireworks-js';
import "./SnakeAnimation.css";
import './rap.css';

const FireworksDisplay = () => {
  const containerRef = useRef(null); // Tham chiếu đến DOM container
  const canvasRef = useRef(null); // Tham chiếu đến canvas
  const audioRef = useRef(null); // Tham chiếu đến audio
  const [countdown, setCountdown] = useState(3);
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại của nhạc
  const [currentLyric, setCurrentLyric] = useState(''); // Lời bài hát hiện tại
  const [lyricClass, setLyricClass] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  // Danh sách lời bài hát
  const lyrics = [
    { time: 1, text: '.....', type: 'normal' },
    { time: 6, text: 'Chúc Mừng Năm Mới 2025!', type: 'normal' },
    { time: 34, text: 'Xuân mang tình yêu muôn nhà', type: 'normal' },
    { time: 37, text: 'Mang lời ca chan hoà', type: 'normal' },
    { time: 39, text: 'Yêu thương hạnh phúc sum vầy', type: 'normal' },
    { time: 40, text: 'Tết năm nay, nồng ấm đong đầy', type: 'normal' },
    { time: 43, text: 'Mưa rơi dịu êm gió mang hương về', type: 'normal' },
    { time: 45, text: 'Dập dìu trông cánh chim xa vời', type: 'normal' },
    { time: 47, text: 'Từng nhịp giây qua, con tim sao bồi hồi.', type: 'normal' },

    { time: 51, text: 'Xuân sang cành lá đâm chồi' },
    { time: 54, text: 'Bao buồn vui qua rồi' },
    { time: 56, text: 'Đưa con về với yên bình, với gia đình nặng nghĩa ân tình' },
    { time: 60, text: 'Cây mai đào khoe sắc hoa thêm màu' },
    { time: 62, text: 'Nhẹ nhàng trong nắng xuân tươi hồng' },
    { time: 64, text: 'Về nhà nhanh thôi, ba mẹ đang ngóng trông.' },

    { time: 68, text: 'Bạn bè vui khoe áo mới, xuân tới, phơi phới' },
    { time: 72, text: 'Những bao lì xì ngay ngắn, may mắn, tươi tắn' },
    { time: 76, text: 'Bánh chưng thơm lừng ngất ngây xuân về ngập tràn lộc muôn nơi' },
    { time: 81, text: 'Nắng ban mai hé môi cười, dịu dàng xuân đến.' },

    { time: 86, text: 'Ề ô ố ô ố' },
    { time: 88, text: 'Có chú chim non mừng vui hót sau nhà' },
    { time: 90, text: 'Ề ô ố ô ố' },
    { time: 92, text: 'Có tiếng em thơ mừng vui bóc bao quà' },
    { time: 94, text: 'Ề ô ố ô ố' },
    { time: 96, text: 'Có gió mang xuân mừng vui chúc ông bà' },
    { time: 100, text: 'Cười mãi thôi, một năm mới bình an, năm mới bình an.' },

    { time: 111, text: 'Ok. Về nhà với mẹ với ba', type: 'rap' },
    { time: 113, text: 'Quanh bếp hồng ấm áp vui hát ca', type: 'rap' },
    { time: 115, text: 'Nắng mai rộn ràng e ấp thướt tha', type: 'rap' },
    { time: 117, text: 'Pháo hoa báo hiệu một năm cũ đã qua', type: 'rap' },
    { time: 119, text: 'Năm mươi sắc chứa đựng bao hy vọng bình yên về muôn nhà', type: 'rap' },
    { time: 122, text: 'Tết đoàn viên sum vầy sẻ chia từng món quà', type: 'rap' },
    { time: 124, text: 'Rộn ràng mừng ngày xuân', type: 'rap' },
    { time: 125, text: 'Hoà nhịp cùng ngày xuân....', type: 'rap' },
    { time: 126, text: 'Rồi cả cuộc đời ngập tràn nụ cười lộc ngày xuân ngày xuân', type: 'rap' },


    { time: 128, text: 'Xuân sang cành lá đâm chồi' },
    { time: 130, text: 'Bao buồn vui qua rồi' },
    { time: 132, text: 'Đưa con về với yên bình, với gia đình nặng nghĩa ân tình' },
    { time: 136, text: 'Cây mai đào khoe sắc hoa thêm màu' },
    { time: 138, text: 'Nhẹ nhàng trong nắng xuân tươi hồng' },
    { time: 140, text: 'Về nhà nhanh thôi, ba mẹ đang ngóng trông.' },

    { time: 144, text: 'Bạn bè vui khoe áo mới, xuân tới, phơi phới' },
    { time: 148, text: 'Những bao lì xì ngay ngắn, may mắn, tươi tắn' },
    { time: 152, text: 'Bánh chưng thơm lừng ngất ngây xuân về ngập tràn lộc muôn nơi' },
    { time: 157, text: 'Nắng ban mai hé môi cười, dịu dàng xuân đến.' },

    { time: 162, text: 'Ề ô ố ô ố' },
    { time: 164, text: 'Có chú chim non mừng vui hót sau nhà' },
    { time: 166, text: 'Ề ô ố ô ố' },
    { time: 168, text: 'Có tiếng em thơ mừng vui bóc bao quà' },
    { time: 170, text: 'Ề ô ố ô ố' },
    { time: 172, text: 'Có gió mang xuân mừng vui chúc ông bà' },
    { time: 175, text: 'Cười mãi thôi, một năm mới bình an, năm mới bình an.' },

    { time: 191, text: 'Nào cùng dang tay hoà vào mây mừng tết nay mùa xuân tới' },
    { time: 195, text: 'Mừng tết sum vầy, nụ cười mãi đong đầy' },
    { time: 200, text: 'Mừng tết năm nay, rộn ràng pháo giao thừa' },
    { time: 204, text: 'Mừng tết sum vầy, nụ cười mãi đong đầy.' },

    { time: 212, text: 'Ề ô ố ô ố' },
    { time: 214, text: 'Có chú chim non mừng vui hót sau nhà' },
    { time: 216, text: 'Ề ô ố ô ố' },
    { time: 218, text: 'Có tiếng em thơ mừng vui bóc bao quà' },
    { time: 221, text: 'Ề ô ố ô ố' },
    { time: 223, text: 'Có gió mang xuân mừng vui chúc ông bà' },
    { time: 226, text: 'Cười mãi thôi, một năm mới bình an, năm mới bình an.' },
    {
      time: 228,
      text: (
        <>
          Năm mới đến, chúc bạn và gia đình luôn vui vẻ, hạnh phúc, phát tài phát lộc, mãi đoàn kết và yêu thương nhau!<br />
          Chúc bạn thành công trong công việc và may mắn trong cuộc sống!<br />
          CHÚC MỪNG NĂM MỚI 2025!
        </>
      )
    }
    
  ];

  // Hàm bắn pháo hoa
  const fireworkDisplay = () => {
    if (canvasRef.current) {
      const fireworks = new Fireworks(canvasRef.current, {
        hue: { min: 0, max: 360 },
        delay: { min: 20, max: 50 },
        rocketsPoint: { min: 50, max: 50 },
        speed: 3,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 200,
        trace: 2,
        explosion: 5,
        autoresize: true,
        brightness: { min: 50, max: 80, decay: { min: 0.015, max: 0.03 } },
        boundaries: {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });

      fireworks.start(); // Bắt đầu pháo hoa
      return fireworks; // Trả về đối tượng Fireworks để có thể stop sau này
    }
    return null;
  };


  // Theo dõi thời gian phát nhạc
  useEffect(() => {
    const audioElement = audioRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audioElement.currentTime); // Cập nhật thời gian nhạc
    };

    audioElement.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      audioElement.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;

        // Tìm lời bài hát tương ứng với thời gian hiện tại
        const matchedLyric = lyrics.find(
          (lyric, index) =>
            currentTime >= lyric.time &&
            (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)
        );

        if (matchedLyric) {
          setCurrentLyric(matchedLyric.text);
          setLyricClass(matchedLyric.type === 'rap' ? 'rap' : 'normal');
        } else {
          setCurrentLyric('');
          setLyricClass('');
        }
      }
    }, 100); // Cập nhật lời bài hát mỗi 100ms
    return () => clearInterval(timer);
  }, [lyrics]);




  const handleStart = () => {
    setIsButtonVisible(false);
    setShowCountdown(true); // Hiển thị đếm ngược
    setCountdown(3); // Đặt lại đếm ngược về 3
    setIsPlaying(true); // Bắt đầu phát nhạc
  };



  // Quản lý countdown và bắt đầu pháo hoa khi countdown kết thúc
  useEffect(() => {
    let fireworksInstance = null;

    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      // Sau khi đếm ngược đến 0, phát nhạc và bắn pháo hoa
      setShowFireworks(true); // Hiển thị pháo hoa
      audioRef.current?.play(); // Phát nhạc
      fireworksInstance = fireworkDisplay(); // Bắt đầu bắn pháo hoa
    }

    return () => {
      if (fireworksInstance) {
        fireworksInstance.stop(); // Dọn dẹp khi component unmount hoặc khi không cần nữa
      }
    };
  }, [showCountdown, countdown]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: 'black',
      }}
    >
      {/* Canvas cho pháo hoa */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2, // Đặt canvas lên trên hình ảnh
        }}
      ></canvas>

      {/* Audio Player */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 3, // Đặt player lên trên canvas
        }}
      >
        <audio ref={audioRef} controls style={{ width: '300px', display: 'none'}}>
          <source
            src="/mp3/MotNamMoiBinhAn-SonTungMTP-4315569.mp3"
            type="audio/mpeg"
          />
          Trình duyệt của bạn không hỗ trợ audio.
        </audio>
      </div>

      {/* Countdown */}
      {showCountdown && countdown > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '50px',
            color: 'white',
            zIndex: 5,
          }}
        >
          {countdown}
        </div>
      )}
      {/* Lời bài hát */}
      <div
        className={`lyric ${lyricClass}`}
        style={{
          position: 'absolute',
          top: '50%', // Đặt ở giữa màn hình theo chiều dọc
          left: '50%', // Đặt ở giữa màn hình theo chiều ngang
          transform: 'translate(-50%, -50%)', // Căn giữa chính xác
          textAlign: 'center',
          zIndex: 4, // Đặt lời bài hát lên trên cùng
        }}
      >
        {currentLyric}
      </div>
      
      {isButtonVisible && (
        <button
          onClick={handleStart}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            fontSize: '20px',
            zIndex: 7,
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            outline: 'none',
            width: '50px',
            height: '50px',
          }}
        >
          <i className="fas fa-play" style={{ color: '#fff', fontSize: '30px' }}></i> {/* Nút Play */}
        </button>
      )}

    </div>
  );
};

export default FireworksDisplay;
