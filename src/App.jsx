import { useState } from "react";
import "./App.css";

// ============================================================================
// ✏️ [포트폴리오 데이터 수정 영역]
// 아래 데이터(프로필, 기술 스택, 프로젝트 3개)의 텍스트와 링크만 수정하면
// 화면에 자동으로 깔끔하게 반영됩니다.
// ============================================================================
const PORTFOLIO_DATA = {
  profile: {
    role: "BACKEND & FULL-STACK DEVELOPER",
    name: "조예나",
    headline:
      "데이터 정합성과 시스템 안정성을 기반으로, 엔드투엔드 서비스를 구축하는 개발자입니다.",
    subIntro:
      "Spring Framework·MyBatis·Oracle DB 기반의 API 아키텍처 설계와 트랜잭션 제어에 강점이 있으며, React·JSP를 활용한 클라이언트 연동까지 주도적으로 수행합니다.",
    avatar: "/profile.jpg",
    email: "whdpsk_46720@naver.com",
    githubUrl: "https://github.com/a77528221-alt",
    blogUrl: "", // 블로그나 노션 이력서 링크 (사용하지 않으면 "" 빈 문자열로 두세요)
  },

  skillCategories: [
    {
      category: "Languages & Web",
      skills: ["Java", "SQL", "JavaScript", "HTML/CSS"],
    },
    {
      category: "OS",
      skills: [],
    },
    {
      category: "Framework + Library",
      skills: ["Spring Framework", "Spring Boot", "MyBatis", "React", "JSP"],
    },
    {
      category: "Database",
      skills: ["Oracle DB", "MySQL"],
    },
    {
      category: "Tools",
      skills: ["Git", "GitHub", "Maven", "Vite", "Notion", "Figma"],
    },
  ],

  projects: [
    {
      id: 1,
      number: "01",
      title: "Jette-Yak · 스마트 복약 관리 플랫폼",
      period: "2026.09.14 - 2026.10.08 (총 25일)",
      role: "4인 팀 · 백엔드 & 풀스택 (일정·가족·알림 도메인)",
      summary:
        "처방전 OCR·DUR(의약품안전사용서비스) 분석을 바탕으로 개인 및 가족 그룹의 복약 스케줄과 실시간 알림을 통합 관리하는 웹/PWA 서비스입니다.",
      tags: [
        "Java",
        "Spring Framework",
        "MyBatis",
        "Oracle DB",
        "REST API",
        "React",
      ],
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      details: [
        "개인·가족 통합 복약 캘린더 REST API 설계 및 다건 복약 일정 일괄 체크(전체 완료/취소) API 구현",
        "가족 초대·권한 검증(UserAccess) 및 회원 유형별(일반/가상 프로필) 분리 트랜잭션 제어",
        "처방 용법 파싱 기반 복약 시간대 자동 매핑 및 프론트엔드 비동기 요청 경합 방지",
      ],
      highlight:
        "회원 유형에 따른 JDBC 트랜잭션 직접 제어로 구성원 삭제 시 데이터 유실 및 외래키 오류 해결",
      troubleshooting: {
        problem:
          "가족 구성원 삭제 시 직접 등록한 '비회원(가상 프로필)'과 '일반 가입 회원'이 동일 테이블을 참조하고 있어, 일괄 삭제 시 일반 회원의 개인 복약 기록이 유실되거나 가상 프로필의 하위 8개 테이블 외래키 제약조건 위반으로 일부 쿼리만 실행된 채 중단되는 문제 발생",
        solution:
          "@Transactional 대신 SqlSession에서 단일 JDBC Connection을 열어 setAutoCommit(false)로 트랜잭션을 직접 제어했습니다. IS_VIRTUAL 값을 먼저 조회해 일반 회원은 의료 기록을 보존한 채 가족 연결(FAMILY_ID)만 해제하고, 가상 프로필은 참조 역순으로 하위 8개 연관 테이블(처방전 상세·스케줄·보관함 등)을 순차 삭제한 뒤 모든 쿼리가 성공했을 때만 commit(), 도중 예외 발생 시 rollback()을 호출하도록 구현",
        result:
          "일반 회원의 개인 복약 이력 유실을 방지하고, 가상 프로필 삭제 도중 예외가 발생하더라도 이전 단계 쿼리까지 모두 롤백되어 고아 데이터 없이 가족 데이터 정합성을 유지",
      },
      links: {
        github: "https://github.com/a77528221-alt/Jette-Yak",
        docs: "",
        demo: "https://34-64-159-225.sslip.io/",
        video: "https://youtu.be/I-fsd66Os_8",
      },
    },
    {
      id: 2,
      number: "02",
      title: "Frade · 실시간 주식 모의투자 플랫폼",
      period: "2026.08.20 - 2026.09.08 (총 20일)",
      role: "5인 팀 · 백엔드 & 풀스택 (대시보드 API·전체 뷰 통합)",
      summary:
        "키움증권 WebSocket과 SSE 기반 실시간 시세·지수 스트리밍 및 모의 매매, 투자 커뮤니티를 제공하는 서비스입니다.",
      tags: [
        "Java",
        "Spring Framework",
        "MyBatis",
        "Oracle DB",
        "SSE / WebSocket",
        "JSP / JS",
      ],
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      details: [
        "메인 대시보드 API 설계 및 실시간 거래대금·인기 게시글 Top 5 집계 연동",
        "인메모리 캐시를 적용한 KOSPI 지수 차트 조회 API 및 화면 연동 구현",
        "공통 응답 규격(Response Wrapper) 적용 및 트레이딩·커뮤니티·마이페이지 뷰 통합",
      ],
      highlight:
        "스케줄러 기반 인메모리 캐시 조회와 차트 데이터 변환 예외 처리로 대시보드 응답 속도 및 안정성 확보",
      troubleshooting: {
        problem:
          "메인 대시보드 진입 시마다 외부 증권사 API를 직접 호출해 KOSPI 차트와 실시간 랭킹을 가져오면 응답 지연이 발생하고, 서버의 차트 데이터 리스트(List<Object[]>)를 JSP 차트 스크립트로 전달할 때 JSON 변환 오류가 발생하면 대시보드 페이지 전체가 열리지 않는 문제 발생",
        solution:
          '백그라운드 스케줄러가 주기적으로 갱신해 둔 서버 인메모리 캐시(StockMemoryCache·StockRankingCache)에서 시세와 차트 데이터를 즉시 조회하도록 개선했습니다. 또한 차트 리스트를 Jackson ObjectMapper(writeValueAsString)로 JSON 문자열 변환 시 try-catch로 JsonProcessingException을 잡아, 변환에 실패하더라도 기본 빈 배열("[]")을 내려주도록 방어 로직을 구현',
        result:
          "외부 API 중복 호출을 제거해 대시보드 로딩 지연을 해소했으며, 차트 데이터 매핑 오류가 발생하더라도 에러 페이지 대신 인기 종목·커뮤니티 등 대시보드 전체 화면이 정상 렌더링되도록 안정성 확보",
      },
      links: {
        github: "https://github.com/a77528221-alt/frade",
        docs: "",
        demo: "",
        video: "", // 시연 영상 링크 입력란
      },
    },
    {
      id: 3,
      number: "03",
      title: "니옷내옷 · 코디 매칭 및 옷장 공유 서비스",
      period: "2026.08.07 - 2026.09.02 (총 27일)",
      role: "2인 팀 · 프론트엔드 (착용 상태 설계·세트 매칭 로직·레이어링 구현)",
      summary:
        "레트로 윈도우 탐색기 콘셉트의 화면에서 두 캐릭터의 옷장을 오가며 의상을 입히거나 상대방 옷을 가져와 코디하고, 착용 조합에 따른 데이트 결과를 확인하는 웹 서비스입니다.",
      tags: ["React", "JavaScript", "React Router", "HTML/CSS", "Vite"],
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
      details: [
        "1개만 착용하는 부위(상의·하의·외투·양말·신발)는 단일 슬롯으로, 여러 개 착용하는 악세사리는 배열로 분리한 상태 구조 설계",
        "필수 착용 아이템 포함 여부와 제외 카테고리를 비교해 세트 코디 성공 여부를 판별하는 매칭 로직 구현",
        "상대방 옷장 아이템 가져오기(훔쳐오기) 기능 및 7단계(z-index) 의상 겹침 순서 제어 구현",
      ],
      highlight:
        "단일 착용 부위와 다중 착용 악세사리의 상태 구조를 분리해 의상 겹침 및 착용 풀림 오류 해결",
      troubleshooting: {
        problem:
          "악세사리를 여러 개 선택하면 기존 착용 아이템이 덮어써져 풀리고, '악세사리' 탭에 분류된 양말이나 망토형 상의를 입힐 때 신발·캐릭터 손 이미지와 겹치는 순서(z-index)가 꼬여 옷이 뚫고 나오는 현상 발생",
        solution:
          "착용 상태를 부위별 단일 슬롯(top, outer, bottom, socks, shoes)과 다중 배열(acc) 혼합 구조로 변경하고, 화면의 카테고리 탭 분류와 실제 캐릭터 위에 그려지는 7단계 레이어 위치(양말은 신발 아래, 외투는 손 위)를 분리해 매핑하도록 구현",
        result:
          "여러 개의 악세사리를 동시에 착용하거나 상대방 옷을 가져와 조합해도 기존 착장이 풀리지 않고, 모든 의상과 캐릭터 신체 부위가 자연스러운 순서로 표시되도록 개선",
      },
      links: {
        github: "https://github.com/a77528221-alt/niotneot",
        docs: "",
        demo: "https://niotneot-mjj.web.app/",
        video: "", // 시연 영상 링크 입력란
      },
    },
  ],
};

export default function App() {
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const { profile, skillCategories, projects } = PORTFOLIO_DATA;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="portfolio-wrapper">
      {/* 상단 고정 네비게이션 */}
      <header className="top-nav">
        <div className="top-nav-inner">
          <a href="#about" className="brand-logo">
            {profile.name} <span>PORTFOLIO</span>
          </a>
          <nav className="nav-links">
            <a href="#about">소개</a>
            <a href="#skills">기술 스택</a>
            <a href="#projects">프로젝트 (3)</a>
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="nav-github-btn">
                GitHub ↗
              </a>
            )}
          </nav>
        </div>
      </header>

      <main className="portfolio-container">
        {/* =================================================== */}
        {/* [섹션 1] 프로필 & 자기소개 요약 (About)               */}
        {/* =================================================== */}
        <section id="about" className="about-card">
          <div className="profile-main">
            <div className="profile-avatar-wrap">
              <img src={profile.avatar} alt={`${profile.name} 프로필 사진`} />
            </div>

            <div className="profile-content">
              <div className="profile-badge-row">
                <span className="role-badge">{profile.role}</span>
              </div>

              <h1 className="name-title">
                안녕하세요, 백엔드·풀스택 개발자 <strong>{profile.name}</strong>
                입니다.
              </h1>

              <p className="headline-text">{profile.headline}</p>
              {profile.subIntro && (
                <p className="sub-intro-text">{profile.subIntro}</p>
              )}

              <div className="contact-row">
                <button
                  type="button"
                  className={`contact-chip ${copied ? "is-copied" : ""}`}
                  onClick={handleCopyEmail}>
                  <span>{profile.email}</span>
                  <span className={`copy-status ${copied ? "copied" : ""}`}>
                    {copied ? "복사됨" : "복사"}
                  </span>
                </button>

                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-chip">
                    GitHub 바로가기 ↗
                  </a>
                )}

                {profile.blogUrl && (
                  <a
                    href={profile.blogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-chip">
                    기술 블로그 / 노션 ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* =================================================== */}
          {/* [섹션 2] 핵심 기술 스택 (Tech Stacks)               */}
          {/* =================================================== */}
          <div id="skills" className="skills-divider">
            <div className="skills-header">
              <span className="section-label">TECH STACKS</span>
            </div>
            <div className="skills-grid">
              {skillCategories
                .filter((group) => group.skills && group.skills.length > 0)
                .map((group, idx) => (
                  <div key={idx} className="skill-group-box">
                    <span className="skill-group-title">{group.category}</span>
                    <div className="skill-pills-wrap">
                      {group.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* =================================================== */}
        {/* [섹션 3] 핵심 프로젝트 3선 (한눈에 보이는 3열 레이아웃) */}
        {/* =================================================== */}
        <section id="projects" className="projects-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">FEATURED WORKS</span>
              <h2 className="section-title">핵심 프로젝트</h2>
            </div>
            <p className="section-desc">
              문제 정의부터 아키텍처 설계, 트러블슈팅 및 성능 개선까지
              주도적으로 수행한 3개의 대표 프로젝트입니다.
            </p>
          </div>

          <div className="projects-three-grid">
            {projects.map((proj) => (
              <article key={proj.id} className="project-card">
                {/* 썸네일 & 프로젝트 번호 */}
                <div className="project-thumb">
                  <img src={proj.image} alt={proj.title} />
                  <span className="project-number-badge">
                    PROJECT {proj.number}
                  </span>
                </div>

                <div className="project-body">
                  {/* 기간 및 담당 역할 */}
                  <div className="project-meta">
                    <span className="project-period">{proj.period}</span>
                    <span className="project-role">{proj.role}</span>
                  </div>

                  {/* 프로젝트명 & 한 줄 소개 */}
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-summary">{proj.summary}</p>

                  {/* 사용 기술 태그 */}
                  <div className="project-tags">
                    {proj.tags.map((tag, i) => (
                      <span key={i} className="tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 주요 구현 내용 (자세히 넣을 수 있는 불릿 리스트) */}
                  <div className="project-details-box">
                    <p className="details-label">주요 내용 및 역할</p>
                    <ul className="project-details-list">
                      {proj.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 핵심 성과 강조 */}
                  <div className="highlight-box">
                    <span>{proj.highlight}</span>
                  </div>

                  {/* 하단 링크 및 상세보기 버튼 영역 */}
                  <div className="project-footer">
                    <div className="project-links">
                      {proj.links.github && (
                        <a
                          href={proj.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="link-btn primary">
                          GitHub ↗
                        </a>
                      )}
                      {proj.links.docs && (
                        <a
                          href={proj.links.docs}
                          target="_blank"
                          rel="noreferrer"
                          className="link-btn secondary">
                          상세 문서 ↗
                        </a>
                      )}
                      {proj.links.demo && (
                        <a
                          href={proj.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="link-btn secondary">
                          배포 링크 ↗
                        </a>
                      )}
                      {proj.links.video && (
                        <a
                          href={proj.links.video}
                          target="_blank"
                          rel="noreferrer"
                          className="link-btn secondary">
                          시연 영상 ↗
                        </a>
                      )}
                    </div>

                    {proj.troubleshooting && (
                      <button
                        type="button"
                        className="detail-modal-btn"
                        onClick={() => setSelectedProject(proj)}>
                        트러블슈팅 보기 +
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* =================================================== */}
      {/* 프로젝트 상세 내용 / 트러블슈팅 모달                 */}
      {/* =================================================== */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-badge">
                  PROJECT {selectedProject.number} · {selectedProject.period}
                </span>
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-role">{selectedProject.role}</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="닫기">
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h4>프로젝트 개요</h4>
                <p>{selectedProject.summary}</p>
              </div>

              <div className="modal-section">
                <h4>주요 구현 내용</h4>
                <ul className="modal-list">
                  {selectedProject.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {selectedProject.troubleshooting && (
                <div className="modal-section">
                  <h4>트러블슈팅 및 성과</h4>
                  <div className="ts-grid">
                    <div className="ts-item problem">
                      <span className="ts-tag">문제 상황 (Problem)</span>
                      <p>{selectedProject.troubleshooting.problem}</p>
                    </div>
                    <div className="ts-item solution">
                      <span className="ts-tag">해결 방법 (Solution)</span>
                      <p>{selectedProject.troubleshooting.solution}</p>
                    </div>
                    <div className="ts-item result">
                      <span className="ts-tag">결과 및 성과 (Result)</span>
                      <p>{selectedProject.troubleshooting.result}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {selectedProject.links.github && (
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn primary">
                  GitHub 저장소 이동 ↗
                </a>
              )}
              {selectedProject.links.docs && (
                <a
                  href={selectedProject.links.docs}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn secondary">
                  상세 문서 보기 ↗
                </a>
              )}
              {selectedProject.links.demo && (
                <a
                  href={selectedProject.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn secondary">
                  배포 사이트 ↗
                </a>
              )}
              {selectedProject.links.video && (
                <a
                  href={selectedProject.links.video}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn secondary">
                  시연 영상 보기 ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
