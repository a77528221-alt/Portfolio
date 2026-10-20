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
    name: "조하나",
    headline:
      "데이터 정합성과 시스템 안정성을 기반으로, 엔드투엔드 서비스를 구축하는 개발자입니다.",
    subIntro:
      "Spring MVC·MyBatis·Oracle 기반의 API 아키텍처 설계와 트랜잭션 제어에 강점이 있으며, React·JSP를 활용한 클라이언트 연동까지 주도적으로 수행합니다.",
    avatar: "/profile.jpg",
    email: "a77528221@gmail.com",
    githubUrl: "https://github.com/a77528221-alt",
    blogUrl: "", // 블로그나 노션 이력서 링크 (사용하지 않으면 "" 빈 문자열로 두세요)
  },

  skillCategories: [
    {
      category: "Language",
      skills: ["Java", "SQL", "JavaScript", "HTML5 / CSS3"],
    },
    {
      category: "OS",
      skills: [],
    },
    {
      category: "Framework + Library",
      skills: ["Spring MVC", "Spring Boot", "MyBatis", "React", "JSP"],
    },
    {
      category: "Database",
      skills: ["Oracle", "MySQL"],
    },
    {
      category: "Development Tool",
      skills: ["Git", "GitHub", "Maven", "Vite", "Notion", "Figma"],
    },
  ],

  projects: [
    {
      id: 1,
      number: "01",
      title: "Jette-Yak · 스마트 복약 관리 플랫폼",
      period: "2026.09 - 2026.10",
      role: "4인 팀 · 백엔드 & 풀스택 (일정·가족·알림 도메인)",
      summary:
        "처방전 OCR·DUR 분석 기반으로 개인 및 가족 그룹의 복약 스케줄과 실시간 알림을 통합 관리하는 웹/PWA 서비스입니다.",
      tags: ["Java 21", "Spring MVC", "MyBatis", "Oracle", "REST API", "React 19"],
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      details: [
        "개인·가족 통합 캘린더 REST API 설계 및 복약 상태 Batch 토글 구현",
        "가족 초대·권한 검증(UserAccess) 및 회원 유형별 분리 트랜잭션 제어",
        "용법 파싱 기반 복약 시간대 자동 매핑 및 비동기 요청 경합 방지",
      ],
      highlight:
        "수동 트랜잭션 분기 설계로 8개 연관 테이블의 원자적(Atomic) 무결성 확보",
      troubleshooting: {
        problem:
          "가족 구성원 삭제 시 일반 회원과 비회원(가상 프로필)의 하위 복약 데이터 생명주기가 달라 외래키 제약 오류 및 데이터 불일치 발생",
        solution:
          "IS_VIRTUAL 플래그 기반 수동 트랜잭션(autoCommit=false)을 구성해 가상 프로필은 8개 연관 테이블을 연쇄 삭제하고, 일반 회원은 가족 연결(FAMILY_ID)만 해제하도록 분기",
        result:
          "예외 발생 시 부분 반영 없는 완벽한 롤백을 보장하고 가족 복약 데이터의 정합성 100% 달성",
      },
      links: {
        github: "https://github.com/jws909/Jette-Yak",
        docs: "",
        demo: "",
      },
    },
    {
      id: 2,
      number: "02",
      title: "Frade · 실시간 주식 모의투자 플랫폼",
      period: "2026.08 - 2026.09",
      role: "5인 팀 · 백엔드 & 풀스택 (대시보드 API·전체 뷰 통합)",
      summary:
        "키움증권 WebSocket과 SSE 기반 실시간 시세·지수 스트리밍 및 모의 매매, 투자 커뮤니티를 제공하는 서비스입니다.",
      tags: [
        "Java 17",
        "Spring MVC",
        "MyBatis",
        "Oracle",
        "SSE / WebSocket",
        "JSP / JS",
      ],
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      details: [
        "메인 대시보드 API 설계 및 실시간 거래대금·인기글 Top 5 집계 연동",
        "인메모리 캐시 기반 KOSPI 차트 조회 및 Jackson JSON 직렬화 구현",
        "공통 응답 규격(Response Wrapper) 적용 및 트레이딩·커뮤니티 뷰 통합",
      ],
      highlight:
        "인메모리 캐시 연동 파이프라인으로 외부 증권 API 중복 호출 제거",
      troubleshooting: {
        problem:
          "대시보드 진입 시 KOSPI 차트·실시간 랭킹·인기 게시글 동시 조회로 인한 외부 API 호출 병목 및 직렬화 예외 위험 발생",
        solution:
          "스케줄러가 갱신하는 인메모리 캐시(StockMemoryCache·StockRankingCache)를 참조하도록 개선하고 ObjectMapper 예외 방어 로직 적용",
        result:
          "외부 API 직접 호출 없이 대시보드 초기 응답 지연을 해소하고 안정적인 실시간 데이터 서빙 구현",
      },
      links: {
        github: "https://github.com/chlqjarb0216-bit/frade",
        docs: "",
        demo: "",
      },
    },
    {
      id: 3,
      number: "03",
      title: "니옷내옷 · 코디 매칭 및 옷장 공유 서비스",
      period: "2026.08 - 2026.09",
      role: "2인 팀 · 풀스택 프론트엔드 (데이터 모델링·매칭 로직)",
      summary:
        "정규화된 아이템 스키마와 규칙 기반 매칭 엔진으로 캐릭터 간 의상 이관 및 착용 조합을 연산하는 웹 애플리케이션입니다.",
      tags: ["React 19", "JavaScript", "Data Modeling", "State Architecture", "Vite"],
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
      details: [
        "단일 슬롯 객체와 다중 배열(acc)을 결합한 하이브리드 상태 스키마 설계",
        "필수 아이템 교집합 및 배제 조건 검증 기반 코디 세트 매칭 알고리즘 구현",
        "식별자(ID) 파싱 기반 소유권 이관(Steal) 로직 및 7단계 렌더링 계층 분리",
      ],
      highlight:
        "하이브리드 상태 모델링과 규칙 기반 매칭 엔진으로 복합 조합 무결성 확보",
      troubleshooting: {
        problem:
          "다중 악세사리 착용 시 단일 슬롯 상태가 덮어써지고, UI 분류 탭과 실제 착용 계층 불일치로 조합 판별 및 레이어 충돌 발생",
        solution:
          "착용 상태를 단일 슬롯과 배열(acc) 혼합 스키마로 정규화하고, 속성 판별 함수를 통해 UI 필터와 7단계 렌더링 슬롯을 분리",
        result:
          "아이템 복제(Steal) 및 다중 착용 시에도 상태 오염 없이 정확한 세트 판별과 일관된 렌더링 보장",
      },
      links: {
        github: "https://github.com/haney6438/niotneot",
        docs: "",
        demo: "",
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
                안녕하세요, 백엔드·풀스택 개발자 <strong>{profile.name}</strong>입니다.
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
                  <span>✉️ {profile.email}</span>
                  <span className={`copy-status ${copied ? "copied" : ""}`}>
                    {copied ? "✓ 복사됨" : "복사"}
                  </span>
                </button>

                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-chip">
                    🐙 GitHub 바로가기 ↗
                  </a>
                )}

                {profile.blogUrl && (
                  <a
                    href={profile.blogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-chip">
                    📝 기술 블로그 / 노션 ↗
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
                    <span className="highlight-icon">💡</span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
