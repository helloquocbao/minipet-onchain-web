"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Calendar, Sparkles, CheckCircle2, Target, Rocket, ArrowLeft, Wallet, Database, Cpu, Coins, Flame, Lock, Users } from 'lucide-react';

export default function RoadmapPage() {
  const { i18n } = useTranslation();
  
  const currentLangCode = i18n.language?.startsWith('vi') ? 'vi' :
                          i18n.language?.startsWith('zh') ? 'zh' :
                          i18n.language?.startsWith('it') ? 'it' :
                          i18n.language?.startsWith('fr') ? 'fr' :
                          i18n.language?.startsWith('ko') ? 'ko' : 'en';

  const dict: Record<string, any> = {
    en: {
      title: 'Project Roadmap',
      subtitle: 'Development milestones from June 2026 leading up to our Mainnet Launch on September 2, 2026.',
      backHome: 'Back to Home',
      qualityTitle: 'Quality Commitment',
      qualityDesc: 'All updates undergo rigorous performance tests. The Tauri client is built for maximum efficiency, ensuring lightweight resource consumption without impacting your workspace performance.',
      phases: [
        {
          tag: 'Phase 1',
          time: 'June 2026',
          title: 'AI Intelligence & Testnet Launch',
          status: 'In Progress',
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-500/10',
          items: [
            'Integrate llama.cpp local sidecar and Qwen 2.5 0.5B brain offline on desktop, fine-tuned on SUI network documentation and smart contracts data.',
            'Deploy Pet NFT & MIPET Token contracts to Sui Testnet.',
            'Implement Walrus decentralized storage publisher for custom spritesheets.',
            'Enable Google OAuth 2.0 zkLogin flow via Mysten Labs Enoki platform for secure proof generation and salt management.',
            'Build AI Agentic framework: natural language intent parsing → PTB (Programmable Transaction Block) compilation → on-chain execution.',
            'Implement Scam Detection Agent: real-time transaction screening against known malicious contracts on SUI.',
            'Develop Wallet Health Monitor Agent: automated spam token detection, suspicious approval alerts, and risk scoring.'
          ]
        },
        {
          tag: 'Phase 2',
          time: 'July 2026',
          title: 'Multi-Pet & Animator Editor',
          status: 'Upcoming',
          color: 'from-purple-500 to-pink-600',
          textColor: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-500/10',
          items: [
            'Launch multi-skin / multi-pet system concurrently on desktop.',
            'Visual Custom Pet preview & grid coordinates calibration tool.',
            'Integrate desktop contextual window tracking (macOS & Windows).',
            'Develop drag-and-drop file garbage recycler (trash module).',
            'Deploy Auto-Trade Agent: DCA strategies, limit orders, and autonomous 24/7 swap execution.',
            'Implement Portfolio Insight Agent: real-time P&L tracking, portfolio rebalancing suggestions based on market conditions.',
            'Enable On-Chain Task Agent: execute complex multi-step PTBs via simple natural language commands (e.g., "Swap 50 SUI to USDC and stake").'
          ]
        },
        {
          tag: 'Phase 3',
          time: 'August 2026',
          title: 'Security Auditing & Tokenomics Beta',
          status: 'Upcoming',
          color: 'from-amber-500 to-orange-600',
          textColor: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-500/10',
          items: [
            'Audit Sui Move smart contracts & Gas Sponsorship backend API.',
            'Launch public Beta Test program with community rewards.',
            'Optimize desktop app performance and minimize background resource usage.',
            'Enable custom sponsor signatures to prevent transaction spam.'
          ]
        },
        {
          tag: 'Phase 4',
          time: 'September 2, 2026',
          title: 'Mainnet Release & Public Launch',
          status: 'Target Date',
          color: 'from-emerald-500 to-teal-600',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          items: [
            'Deploy contracts onto SUI Mainnet.',
            'Integrate cloud LLM models (Gemini 1.5 Flash, DeepSeek R1).',
            'Launch official marketplace for buying templates and slots.',
            'Enable Pomodoro rewards mechanism (MIPET utility yield).'
          ]
        }
      ]
    },
    vi: {
      title: 'Lộ Trình Phát Triển',
      subtitle: 'Các cột mốc phát triển từ tháng 6/2026 hướng tới sự kiện ra mắt Mainnet ngày 2/9/2026.',
      backHome: 'Quay lại Trang chủ',
      qualityTitle: 'Cam kết chất lượng',
      qualityDesc: 'Mọi bản cập nhật đều được kiểm thử hiệu năng nghiêm ngặt. Ứng dụng client Tauri được tối ưu hóa tối đa giúp tiết kiệm tài nguyên hệ thống và không làm ảnh hưởng đến không gian làm việc của bạn.',
      phases: [
        {
          tag: 'Giai đoạn 1',
          time: 'Tháng 6, 2026',
          title: 'Tích Hợp Trí Tuệ Nhân Tạo & Testnet',
          status: 'Đang Thực Hiện',
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-500/10',
          items: [
            'Tích hợp lõi llama.cpp và bộ não Qwen 2.5 0.5B chạy offline trên desktop, được huấn luyện tối ưu với dữ liệu và hợp đồng thông minh của SUI chain.',
            'Triển khai Smart Contract Pet NFT và Token MIPET lên Sui Testnet.',
            'Hoàn thiện cổng tải ảnh/spritesheet lên Walrus phi tập trung.',
            'Tích hợp tính năng đăng nhập Google zkLogin qua nền tảng Enoki của Mysten Labs, tối ưu hoá tốc độ tạo proof và bảo mật Salt.',
            'Xây dựng framework AI Agentic: phân tích ý định ngôn ngữ tự nhiên → biên dịch PTB (Programmable Transaction Block) → thực thi on-chain.',
            'Triển khai Scam Detection Agent: quét giao dịch real-time, đối chiếu với danh sách contract độc hại trên SUI.',
            'Phát triển Wallet Health Monitor Agent: tự động phát hiện token rác, cảnh báo approve đáng ngờ, chấm điểm rủi ro ví.'
          ]
        },
        {
          tag: 'Giai đoạn 2',
          time: 'Tháng 7, 2026',
          title: 'Tính Năng Nuôi Nhiều Pet & Bộ Chỉnh Sửa',
          status: 'Sắp Diễn Ra',
          color: 'from-purple-500 to-pink-600',
          textColor: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-500/10',
          items: [
            'Ra mắt hệ thống gọi đồng thời nhiều Pet chạy độc lập trên desktop.',
            'Công cụ căn chỉnh toạ độ lưới ảnh và xem trước hoạt ảnh chuyển động.',
            'Theo dõi ngữ cảnh ứng dụng đang hoạt động (macOS & Windows).',
            'Hoàn thành tính năng kéo thả file để thú cưng "ăn rác".',
            'Triển khai Auto-Trade Agent: chiến lược DCA, limit order, tự động swap 24/7.',
            'Phát triển Portfolio Insight Agent: theo dõi P&L real-time, đề xuất rebalance danh mục theo biến động thị trường.',
            'Kích hoạt On-Chain Task Agent: thực thi PTB phức tạp nhiều bước qua lệnh ngôn ngữ tự nhiên (VD: "Đổi 50 SUI sang USDC rồi stake").'
          ]
        },
        {
          tag: 'Giai đoạn 3',
          time: 'Tháng 8, 2026',
          title: 'Kiểm Toán Bảo Mật & Beta Test',
          status: 'Sắp Diễn Ra',
          color: 'from-amber-500 to-orange-600',
          textColor: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-500/10',
          items: [
            'Kiểm toán bảo mật (Audit) Smart Contract Move và API Backend.',
            'Mở chương trình thử nghiệm cộng đồng (Beta Test) nhận thưởng.',
            'Tối ưu hóa hiệu năng ứng dụng desktop và giảm thiểu tài nguyên chạy nền.',
            'Cấu hình chữ ký tài trợ phí gas (Gas Sponsor) chống spam.'
          ]
        },
        {
          tag: 'Giai đoạn 4',
          time: '02 Tháng 9, 2026',
          title: 'Ra Mắt Mainnet & Phát Hành Chính Thức',
          status: 'Ngày Mục Tiêu',
          color: 'from-emerald-500 to-teal-600',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          items: [
            'Triển khai các hợp đồng thông minh chính thức lên SUI Mainnet.',
            'Tích hợp thêm các mô hình Cloud lớn (Gemini 1.5 Flash, DeepSeek R1).',
            'Mở cửa sàn giao dịch mua bán Pet Template và Mint Slot.',
            'Tích hợp cơ chế thưởng token MIPET khi hoàn thành Pomodoro.'
          ]
        }
      ]
    },
    zh: {
      title: '项目路线图',
      subtitle: '2026年6月至2026年9月2日 Mainnet 正式上线期间的开发里程碑。',
      backHome: '返回首页',
      phases: [
        {
          tag: '阶段 1',
          time: '2026年6月',
          title: 'AI 智能与 Testnet 发布',
          status: '进行中',
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-500/10',
          items: [
            '在桌面端集成本地 llama.cpp 侧车和 Qwen 2.5 0.5B 离线大脑，针对 SUI 网络文档和智能合约数据进行了微调。',
            '在 Sui Testnet 上部署 Pet NFT 和 MIPET 代币合约。',
            '实现用于自定义精灵图的 Walrus 去中心化存储发布器。',
            '启用 Google OAuth 2.0 zkLogin 登录流程。'
          ]
        },
        {
          tag: '阶段 2',
          time: '2026年7月',
          title: '多宠物与动画编辑器',
          status: '即将到来',
          color: 'from-purple-500 to-pink-600',
          textColor: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-500/10',
          items: [
            '桌面端同时启动多皮肤/多宠物系统。',
            '视觉化自定义宠物预览及网格坐标校准工具。',
            '集成桌面端上下文窗口跟踪（macOS & Windows）。',
            '开发拖放式文件垃圾回收器（垃圾桶模块）。'
          ]
        },
        {
          tag: '阶段 3',
          time: '2026年8月',
          title: '安全审计与代币经济学测试版',
          status: '即将到来',
          color: 'from-amber-500 to-orange-600',
          textColor: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-500/10',
          items: [
            '审计 Sui Move 智能合约及 Gas 赞助后端 API。',
            '迁移 zkLogin 身份验证和交易流程至 Mysten Labs 的 Enoki 平台，以优化证明速度并确保密钥安全存储。',
            '推出带社区奖励的公开 Beta 测试计划。',
            '优化桌面应用性能，尽量减少后台资源占用。',
            '启用自定义赞助签名以防止交易垃圾邮件。'
          ]
        },
        {
          tag: '阶段 4',
          time: '2026年9月2日',
          title: 'Mainnet 发布与正式上线',
          status: '目标日期',
          color: 'from-emerald-500 to-teal-600',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          items: [
            '在 SUI Mainnet 上部署合约。',
            '集成云端 LLM 模型（Gemini 1.5 Flash, DeepSeek R1）。',
            '推出用于购买模板和插槽的官方市场。',
            '启用番茄钟奖励机制（MIPET 实用收益）。'
          ]
        }
      ]
    },
    it: {
      title: 'Roadmap del Progetto',
      subtitle: 'Milestones di sviluppo da giugno 2026 fino al lancio di Mainnet il 2 settembre 2026.',
      backHome: 'Torna alla Home',
      phases: [
        {
          tag: 'Fase 1',
          time: 'Giugno 2026',
          title: 'Intelligenza IA & Lancio Testnet',
          status: 'In Corso',
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-500/10',
          items: [
            'Integra sidecar locale llama.cpp e cervello offline Qwen 2.5 0.5B su desktop, ottimizzato sulla documentazione e smart contract di SUI.',
            'Distribuisci i contratti Pet NFT & MIPET Token su Sui Testnet.',
            'Implementa il publisher di archiviazione decentralizzato Walrus per gli spritesheet personalizzati.',
            'Abilita il flusso zkLogin di Google OAuth 2.0.'
          ]
        },
        {
          tag: 'Fase 2',
          time: 'Luglio 2026',
          title: 'Multi-Pet & Editor Animatore',
          status: 'In Arrivo',
          color: 'from-purple-500 to-pink-600',
          textColor: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-500/10',
          items: [
            'Lancia il sistema multi-skin / multi-pet simultaneamente su desktop.',
            'Anteprima visiva dei Pet personalizzati & strumento di calibrazione delle coordinate della griglia.',
            'Integra il tracciamento della finestra contestuale del desktop (macOS & Windows).',
            'Sviluppa il riciclatore di file indesiderati drag-and-drop (modulo cestino).'
          ]
        },
        {
          tag: 'Fase 3',
          time: 'Agosto 2026',
          title: 'Controllo Sicurezza & Tokenomics Beta',
          status: 'In Arrivo',
          color: 'from-amber-500 to-orange-600',
          textColor: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-500/10',
          items: [
            'Controlla gli smart contract Sui Move e l\'API backend di sponsorizzazione del gas.',
            'Migra il flusso di autenticazione e transazione zkLogin alla piattaforma Enoki di Mysten Labs per una velocità di proof ottimizzata e conservazione delle chiavi sicura.',
            'Lancia il programma di test Beta pubblico con premi della community.',
            'Ottimizza le prestazioni dell\'app desktop e riduci al minimo l\'uso delle risorse in background.',
            'Abilita firme di sponsorizzazione personalizzate per prevenire lo spam di transazioni.'
          ]
        },
        {
          tag: 'Fase 4',
          time: '2 Settembre 2026',
          title: 'Rilascio Mainnet & Lancio Pubblico',
          status: 'Data Obiettivo',
          color: 'from-emerald-500 to-teal-600',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          items: [
            'Distribuisci i contratti su SUI Mainnet.',
            'Integra modelli LLM cloud (Gemini 1.5 Flash, DeepSeek R1).',
            'Lancia il marketplace ufficiale per l\'acquisto di template e slot.',
            'Abilita il meccanismo di ricompensa Pomodoro (rendimento di utilità MIPET).'
          ]
        }
      ]
    },
    fr: {
      title: 'Feuille de Route du Projet',
      subtitle: 'Jalons de développement de juin 2026 jusqu\'au lancement du Mainnet le 2 septembre 2026.',
      backHome: 'Retour à l\'accueil',
      phases: [
        {
          tag: 'Phase 1',
          time: 'Juin 2026',
          title: 'Intelligence IA & Lancement du Testnet',
          status: 'En cours',
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-500/10',
          items: [
            'Intégrer le sidecar local llama.cpp et le cerveau hors ligne Qwen 2.5 0.5B sur bureau, affiné avec la documentation SUI et les smart contracts.',
            'Déployer les contrats Pet NFT & MIPET Token sur le Sui Testnet.',
            'Implémenter le stockage décentralisé Walrus pour les spritesheets personnalisés.',
            'Activer le flux de connexion Google OAuth 2.0 zkLogin.'
          ]
        },
        {
          tag: 'Phase 2',
          time: 'Juillet 2026',
          title: 'Multi-Pet & Éditeur d\'Animations',
          status: 'À venir',
          color: 'from-purple-500 to-pink-600',
          textColor: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-500/10',
          items: [
            'Lancer le système multi-skin / multi-pet simultanément sur le bureau.',
            'Aperçu visuel des pets personnalisés & outil de calibration des coordonnées de grille.',
            'Intégrer le suivi de fenêtre contextuelle sur bureau (macOS & Windows).',
            'Développer le recycleur de fichiers indésirables par glisser-déposer (module corbeille).'
          ]
        },
        {
          tag: 'Phase 3',
          time: 'Août 2026',
          title: 'Audit de Sécurité & Bêta Tokenomics',
          status: 'À venir',
          color: 'from-amber-500 to-orange-600',
          textColor: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-500/10',
          items: [
            'Auditer les contrats intelligents Sui Move & l\'API backend de sponsoring de gas.',
            'Migrer le flux d\'authentification zkLogin et les transactions vers la plateforme Enoki de Mysten Labs pour une génération de preuve optimisée et un stockage sécurisé des clés.',
            'Lancer le programme de test Bêta public avec des récompenses communautaires.',
            'Optimiser les performances de l\'application de bureau et minimiser l\'utilisation des ressources en arrière-plan.',
            'Activer les signatures de sponsor personnalisées pour éviter le spam de transactions.'
          ]
        },
        {
          tag: 'Phase 4',
          time: '2 Septembre 2026',
          title: 'Sortie Mainnet & Lancement Public',
          status: 'Date Cible',
          color: 'from-emerald-500 to-teal-600',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          items: [
            'Déployer les contrats intelligents sur le SUI Mainnet.',
            'Intégrer les modèles LLM cloud (Gemini 1.5 Flash, DeepSeek R1).',
            'Ouvrir la place de marché officielle pour l\'achat de templates et d\'emplacements.',
            'Activer le mécanisme de récompenses Pomodoro (rendement MIPET).'
          ]
        }
      ]
    },
    ko: {
      title: '프로젝트 로드맵',
      subtitle: '2026년 6월부터 시작하여 2026년 9월 2일 메인넷 출시까지의 개발 마일스톤.',
      backHome: '홈으로 돌아가기',
      phases: [
        {
          tag: '1단계',
          time: '2026년 6월',
          title: 'AI 인텔리전스 & 테스트넷 출시',
          status: '진행 중',
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-500/10',
          items: [
            '데스크톱 오프라인에서 로컬 llama.cpp 사이드카 및 Qwen 2.5 0.5B 두뇌 통합 (SUI 블록체인 문서 및 스마트 계약 데이터 미세 조정).',
            'Sui 테스트넷에 Pet NFT 및 MIPET 토큰 계약 배포.',
            '커스텀 스프라이트 시트를 위한 Walrus 탈중앙화 스토리지 퍼블리셔 구현.',
            'Google OAuth 2.0 zkLogin 흐름 활성화.'
          ]
        },
        {
          tag: '2단계',
          time: '2026년 7월',
          title: '멀티 펫 & 애니메이터 에디터',
          status: '예정됨',
          color: 'from-purple-500 to-pink-600',
          textColor: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-500/10',
          items: [
            '데스크톱에서 다중 스킨 / 다중 펫 시스템 동시 출시.',
            '커스텀 펫 시각적 미리보기 및 그리드 좌표 정렬 도구.',
            '데스크톱 컨텍스트 창 추적 통합 (macOS & Windows).',
            '드래그 앤 드롭 파일 쓰레기 수거기 개발 (휴지통 모듈).'
          ]
        },
        {
          tag: '3단계',
          time: '2026년 8월',
          title: '보안 감사 & 토크노믹스 베타',
          status: '예정됨',
          color: 'from-amber-500 to-orange-600',
          textColor: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-500/10',
          items: [
            'Sui Move 스마트 계약 및 가스 후원 백엔드 API 감사.',
            '증명 속도 최적화 및 보안 키 스토리지를 위해 zkLogin 인증 및 트랜잭션 흐름을 Mysten Labs의 Enoki 플랫폼으로 마이그레이션.',
            '커뮤니티 보상이 포함된 공개 베타 테스트 프로그램 시작.',
            '데스크톱 앱 성능 최적화 및 백그라운드 리소스 사용 최소화.',
            '거래 스팸 방지를 위한 맞춤형 스폰서 서명 활성화.'
          ]
        },
        {
          tag: '4단계',
          time: '2026년 9월 2일',
          title: '메인넷 출시 & 공식 론칭',
          status: '목표 날짜',
          color: 'from-emerald-500 to-teal-600',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          items: [
            'SUI 메인넷에 계약 배포.',
            '클라우드 LLM 모델 통합 (Gemini 1.5 Flash, DeepSeek R1).',
            '템플릿 및 슬롯 구매를 위한 공식 상점(마켓플레이스) 출시.',
            '포모도로 보상 메커니즘 활성화 (MIPET 유틸리티 수익).'
          ]
        }
      ]
    }
  };

  const text = dict[currentLangCode] || dict['en'];
  const [activeTab, setActiveTab] = useState<'roadmap' | 'tokenomics'>('roadmap');

  const tokenomicsText = {
    en: {
      title: 'MIPET Tokenomics',
      subtitle: 'Fixed supply, community-first distribution.',
      totalSupply: 'Total Supply',
      burned: 'Burned (Dead Address)',
      circulating: 'Circulating Supply',
      adminRenounced: 'Admin Renounced',
      adminDesc: 'TreasuryCap sent to 0x0 dead address. No one can mint new tokens.',
      distribution: 'Distribution',
      distItems: [
        { label: 'Burned (Dead Address)', pct: '50%', color: 'bg-red-500', icon: '🔥' },
        { label: 'Community & Ecosystem', pct: '30%', color: 'bg-indigo-500', icon: '👥' },
        { label: 'Development & Team', pct: '2%', color: 'bg-purple-500', icon: '⚙️' },
        { label: 'Liquidity & Partnerships', pct: '18%', color: 'bg-emerald-500', icon: '💧' },
      ],
      utility: 'Token Utility',
      utilityItems: [
        'Buy Mint Slots to create custom Pet NFTs',
        'Rename pets on-chain',
        'Bonk other pets (social interaction fee)',
        'AI Agent Trade staking & rewards',
        'Governance voting (future)',
      ],
    },
    vi: {
      title: 'Tokenomics MIPET',
      subtitle: 'Tổng cung cố định, phân phối ưu tiên cộng đồng.',
      totalSupply: 'Tổng Cung',
      burned: 'Đã Đốt (Ví Dead)',
      circulating: 'Lưu Thông',
      adminRenounced: 'Từ Bỏ Quyền Admin',
      adminDesc: 'TreasuryCap đã gửi vào địa chỉ 0x0. Không ai có thể mint thêm token.',
      distribution: 'Phân Phối',
      distItems: [
        { label: 'Đốt (Ví Dead)', pct: '50%', color: 'bg-red-500', icon: '🔥' },
        { label: 'Cộng đồng & Hệ sinh thái', pct: '30%', color: 'bg-indigo-500', icon: '👥' },
        { label: 'Phát triển & Đội ngũ', pct: '2%', color: 'bg-purple-500', icon: '⚙️' },
        { label: 'Thanh khoản & Đối tác', pct: '18%', color: 'bg-emerald-500', icon: '💧' },
      ],
      utility: 'Tiện Ích Token',
      utilityItems: [
        'Mua Mint Slot để tạo Pet NFT tuỳ chỉnh',
        'Đổi tên pet on-chain',
        'Bonk pet khác (phí tương tác xã hội)',
        'Staking & phần thưởng AI Agent Trade',
        'Bỏ phiếu quản trị (tương lai)',
      ],
    },
  };
  const tknText = (tokenomicsText as any)[currentLangCode] || tokenomicsText.en;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-transparent relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-200/10 dark:bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-pink-200/10 dark:bg-pink-900/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }} />
      
      {/* Grid Canvas Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.04)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(rgba(244,63,94,0.02)_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-550 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            {text.backHome}
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 text-[10px] font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            <Target size={11} className="animate-pulse" /> MiniPet Roadmap
          </div>
          <h1 className="text-[34px] sm:text-[44px] font-[950] text-[#111827] dark:text-white tracking-tight mt-4 mb-4 leading-tight">
            {text.title}
          </h1>
          <p className="text-gray-550 dark:text-gray-400 text-[13px] sm:text-[14.5px] max-w-xl mx-auto leading-relaxed font-medium">
            {activeTab === 'roadmap' ? text.subtitle : tknText.subtitle}
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-2 mt-6">
            <button onClick={() => setActiveTab('roadmap')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'roadmap' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              <Rocket size={12} className="inline mr-1.5" />Roadmap
            </button>
            <button onClick={() => setActiveTab('tokenomics')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'tokenomics' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              <Coins size={12} className="inline mr-1.5" />Tokenomics
            </button>
          </div>
        </div>

        {activeTab === 'tokenomics' ? (
          /* Tokenomics Content */
          <div className="max-w-3xl mx-auto space-y-8 mt-12">
            {/* Supply Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl text-center">
                <Coins size={20} className="mx-auto text-indigo-500 mb-2" />
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{tknText.totalSupply}</div>
                <div className="text-xl font-black text-[#111827] dark:text-white mt-1">500,000,000</div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl text-center">
                <Flame size={20} className="mx-auto text-red-500 mb-2" />
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{tknText.burned}</div>
                <div className="text-xl font-black text-red-500 mt-1">250,000,000</div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl text-center">
                <Users size={20} className="mx-auto text-emerald-500 mb-2" />
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{tknText.circulating}</div>
                <div className="text-xl font-black text-emerald-500 mt-1">250,000,000</div>
              </div>
            </div>

            {/* Admin Renounced */}
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl flex items-center gap-3">
              <Lock size={18} className="text-red-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-black text-red-600 dark:text-red-400">{tknText.adminRenounced}</div>
                <div className="text-[11px] text-red-500/80 dark:text-red-400/60 mt-0.5">{tknText.adminDesc}</div>
              </div>
            </div>

            {/* Distribution */}
            <div className="p-6 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl">
              <h3 className="text-sm font-black text-[#111827] dark:text-white mb-4">{tknText.distribution}</h3>
              {/* Pie Chart */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* 50% Burned - red */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray={`${50 * 2.512} ${100 * 2.512}`} strokeDashoffset="0" className="-rotate-90 origin-center" />
                    {/* 30% Community - indigo */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="20" strokeDasharray={`${30 * 2.512} ${100 * 2.512}`} strokeDashoffset={`${-50 * 2.512}`} className="-rotate-90 origin-center" />
                    {/* 2% Dev - purple */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="20" strokeDasharray={`${2 * 2.512} ${100 * 2.512}`} strokeDashoffset={`${-80 * 2.512}`} className="-rotate-90 origin-center" />
                    {/* 18% Liquidity - emerald */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray={`${18 * 2.512} ${100 * 2.512}`} strokeDashoffset={`${-82 * 2.512}`} className="-rotate-90 origin-center" />
                    {/* Center white circle */}
                    <circle cx="50" cy="50" r="28" className="fill-white dark:fill-slate-900" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">MIPET</span>
                    <span className="text-xl font-black text-[#111827] dark:text-white">500M</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2.5 flex-1">
                  {tknText.distItems.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-[12px] text-gray-600 dark:text-gray-400 font-medium">{item.icon} {item.label}</span>
                      <span className="text-[12px] font-bold text-[#111827] dark:text-white ml-auto">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Utility */}
            <div className="p-6 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl">
              <h3 className="text-sm font-black text-[#111827] dark:text-white mb-3">{tknText.utility}</h3>
              <ul className="space-y-2">
                {tknText.utilityItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] text-gray-600 dark:text-gray-400 font-medium">
                    <CheckCircle2 size={14} className="text-indigo-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
        <>
        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column: Vertical Timeline */}
          <div className="lg:col-span-8 relative border-l border-slate-200 dark:border-slate-800/80 ml-2 sm:ml-3 pl-6 sm:pl-8 space-y-12">
            {text.phases.map((p: any, idx: number) => (
              <div key={idx} className="relative">
                
                {/* Timeline dot element */}
                <span className="absolute left-[-38px] sm:left-[-46px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 shadow-sm ring-8 ring-white dark:ring-slate-950/20 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:scale-110">
                  {idx === 0 ? (
                    <Sparkles size={12} className="text-blue-500" />
                  ) : idx === 3 ? (
                    <Rocket size={12} className="text-emerald-500" />
                  ) : (
                    <Calendar size={12} className="text-gray-400" />
                  )}
                </span>

                {/* Phase Card */}
                <div className="bg-white dark:bg-[#18181b]/60 border border-slate-200/80 dark:border-white/10 p-5 sm:p-6 rounded-2xl relative overflow-hidden group shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.05)] dark:hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-550/2 blur-2xl rounded-full group-hover:scale-125 transition-transform" />
                  
                  {/* Phase meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r ${p.color} text-white shadow-sm`}>
                        {p.tag}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-gray-455 dark:text-gray-500">
                        {p.time}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider ${p.textColor} ${p.bgColor} border border-transparent`}>
                      {p.status}
                    </span>
                  </div>

                  {/* Phase title */}
                  <h3 className="text-[17px] sm:text-[18.5px] font-black text-[#111827] dark:text-white mb-5">
                    {p.title}
                  </h3>

                  {/* Phase list items */}
                  <ul className="space-y-3">
                    {p.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-[12px] sm:text-[12.5px] font-medium text-gray-550 dark:text-gray-300">
                        <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${idx === 0 ? 'text-indigo-500' : 'text-gray-300 dark:text-gray-700'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Visual Dashboard / Trust Builder (Sticky Card) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            <div className="bg-white dark:bg-[#18181b]/60 border border-slate-200/80 dark:border-white/10 p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* Header controls */}
              <div className="flex items-center justify-between border-b border-slate-200/30 dark:border-slate-800/50 pb-4 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[9px] font-mono font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  minipet_dashboard.sys
                </span>
              </div>

              {/* Dashboard Stats */}
              <div className="space-y-4">
                {/* Stat 1: Sui Wallet */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Wallet size={15} />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-[#111827] dark:text-white block">Sui zkLogin</span>
                      <span className="text-[8px] font-mono text-gray-400 dark:text-gray-500 block">Sui Testnet (Active)</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    Connected
                  </span>
                </div>

                {/* Stat 2: Walrus Protocol */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Database size={15} />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-[#111827] dark:text-white block">Walrus Storage</span>
                      <span className="text-[8px] font-mono text-gray-400 dark:text-gray-500 block">Decentralized Blobs</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    100% SLA
                  </span>
                </div>

                {/* Stat 3: Qwen Brain */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                      <Cpu size={15} />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-[#111827] dark:text-white block">Qwen 2.5 0.5B</span>
                      <span className="text-[8px] font-mono text-gray-400 dark:text-gray-500 block">Local Sidecar (Offline)</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-extrabold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Animated visual of companion walking in background grid */}
              <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 rounded-2xl relative min-h-[120px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:10px_10px]" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="cat-sprite-frame scale-50" />
                  <div className="text-[8.5px] font-bold text-gray-455 dark:text-gray-500 mt-2 font-mono">
                    mini_companion_render.bin
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle card */}
            <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl">
              <h4 className="text-[12px] font-black text-indigo-600 dark:text-indigo-400 mb-1.5 uppercase tracking-wider">
                {text.qualityTitle}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {text.qualityDesc}
              </p>
            </div>
          </div>

        </div>
        </>
        )}

      </div>
    </div>
  );
}
