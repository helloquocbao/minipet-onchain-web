"use client";

import { useTranslation } from 'react-i18next';
import { 
  Clock, Cpu, Shield, Terminal, Database, 
  Laptop, ShieldCheck
} from 'lucide-react';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Features = () => {
  const { i18n } = useTranslation();
  
  const currentLangCode = i18n.language?.startsWith('vi') ? 'vi' :
                          i18n.language?.startsWith('zh') ? 'zh' :
                          i18n.language?.startsWith('it') ? 'it' :
                          i18n.language?.startsWith('fr') ? 'fr' :
                          i18n.language?.startsWith('ko') ? 'ko' : 'en';

  const dict: Record<string, Record<string, string>> = {
    en: {
      section_badge: 'Tauri Desktop Companion & On-Chain Integration',
      section_title: 'Desktop Interface & On-Chain Overview',
      section_desc: 'Experience a seamless fusion between interactive desktop animations and robust on-chain transaction protocols powered by the SUI blockchain.',
      bento1_title: 'AI Agent & On-Chain Automation',
      bento1_desc: 'Instantly swap assets, query wallet balances, and sign secure transactions directly from your pet chat. Powered by SUI Move PTBs.',
      bento2_title: 'Tauri Desktop Companion',
      bento2_desc: 'Runs natively in your system tray using Rust sidecar. Uses minimal RAM and CPU for uninterrupted focus.',
      bento3_title: 'Intelligent Alerts',
      bento3_desc: 'Get instant notifications for block events, transaction completions, and focus timers via system toasts.',
      how_it_works: 'How It Works',
      how_it_works_desc: 'Get your custom AI companion running in 3 simple steps',
      step1_title: 'Download Client',
      step1_desc: 'Download the client for your platform. The Qwen AI model (fine-tuned on SUI blockchain data) runs fully offline.',
      step2_title: 'Connect Wallet',
      step2_desc: 'Use Google zkLogin to securely sync your wallet address and authenticate on-chain assets.',
      step3_title: 'Go Autonomous',
      step3_desc: 'Chat with your pet companion, activate focus sessions, or trigger offline token transfers.',
      tech_stack_title: 'Robust Web3 Tech Stack',
      tech_stack_desc: 'Empowering virtual pet economy with state-of-the-art tools',
      tech_tauri_desc: 'Native desktop shell keeping CPU and memory footprint extremely low via Rust sidecar.',
      tech_sui_desc: 'True on-chain ownership secured by smart contracts, leveraging zkLogin authentication and VRF random module.',
      tech_walrus_desc: 'Decentralized storage protocol by Mysten Labs holding asset spritesheets and rich metadata blobs securely.'
    },
    vi: {
      section_badge: 'Tích hợp Tauri Desktop & On-Chain',
      section_title: 'Tổng Quan Chức Năng Trên Desktop & On-Chain',
      section_desc: 'Trải nghiệm sự kết hợp mượt mà giữa hoạt ảnh thú cưng trực quan ngay trên màn hình máy tính của bạn và các giao thức giao dịch, bảo mật ví on-chain trên mạng lưới SUI.',
      bento1_title: 'Trợ Lý AI & Tự Động Hóa',
      bento1_desc: 'Hoán đổi token, kiểm tra số dư và ký duyệt giao dịch an toàn ngay trong khung chat của pet. Mọi thứ được xử lý tự động với SUI Move PTB.',
      bento2_title: 'Desktop Engine Siêu Nhẹ',
      bento2_desc: 'Chạy mượt mà trên khay hệ thống với backend Rust siêu tối ưu. Tiêu tốn cực kỳ ít dung lượng RAM.',
      bento3_title: 'Thông Báo Thông Minh',
      bento3_desc: 'Nhận popup thông báo về sự kiện on-chain, trạng thái giao dịch hoặc các khung giờ tập trung trực tiếp trên màn hình.',
      how_it_works: 'Quy Trình Hoạt Động',
      how_it_works_desc: 'Chỉ với 3 bước đơn giản để có một trợ lý AI đồng hành',
      step1_title: 'Tải app & Tải Mô hình',
      step1_desc: 'Tải ứng dụng MiniPet cho máy tính của bạn. Mô hình AI Qwen (được huấn luyện tối ưu dữ liệu SUI blockchain) sẽ tự động chạy offline.',
      step2_title: 'Đồng bộ Ví & zkLogin',
      step2_desc: 'Sử dụng zkLogin kết nối ví an toàn qua tài khoản Google của bạn để quản lý các tài sản NFT pet trực tiếp.',
      step3_title: 'Giao dịch Tự Động',
      step3_desc: 'Nhập tin nhắn để nói chuyện với Pet của bạn, kích hoạt Pomodoro hoặc ra lệnh thực hiện giao dịch ví an toàn.',
      tech_stack_title: 'Cấu trúc Công nghệ Core',
      tech_stack_desc: 'Công nghệ hiện đại đem lại hiệu suất tối ưu và bảo mật tối đa',
      tech_tauri_desc: 'Giao diện ứng dụng máy tính siêu nhẹ, tối ưu hóa tài nguyên phần cứng và chạy siêu tốc với Rust backend.',
      tech_sui_desc: 'Lưu trữ thực quyền NFT, tích hợp hàm ngẫu nhiên xác định chỉ số hiếm và giao dịch zkLogin an toàn qua Google.',
      tech_walrus_desc: 'Giao thức lưu trữ phi tập trung của Mysten Labs dùng để lưu trữ file hình ảnh pet và siêu dữ liệu an toàn.'
    },
    zh: {
      section_badge: 'Tauri 桌面端与链上集成',
      section_title: '桌面界面与链上功能概览',
      section_desc: '体验直观的桌面宠物动画与基于 SUI 区块链的安全链上交易协议之间的无缝融合。',
      bento1_title: 'AI 代理与链上自动化',
      bento1_desc: '直接从您的宠物聊天窗口即时兑换资产、查询钱包余额并安全签署交易。由 SUI Move PTB 提供支持。',
      bento2_title: 'Tauri 桌面伴侣',
      bento2_desc: '使用 Rust 侧车在系统托盘中原生运行。占用极低的内存和 CPU，不干扰您的专注。',
      bento3_title: '智能通知',
      bento3_desc: '通过系统弹窗即时获取区块事件、交易完成和番茄钟计时器的通知。',
      how_it_works: '工作原理',
      how_it_works_desc: '只需简单 3 步即可启动您的定制 AI 伴侣',
      step1_title: '下载客户端',
      step1_desc: '下载适用于您平台的客户端。Qwen AI 模型（针对 SUI 区块链数据进行了微调）完全离线运行。',
      step2_title: '连接钱包',
      step2_desc: '使用 Google zkLogin 安全同步您的钱包地址并验证链上资产。',
      step3_title: '自主运行',
      step3_desc: '与您的宠物伴侣聊天，激活专注会话，或触发离线代币转账。',
      tech_stack_title: '强大 Web3 技术栈',
      tech_stack_desc: '使用最前沿的工具赋能虚拟宠物经济',
      tech_tauri_desc: '原生桌面外壳，通过 Rust 侧车使 CPU 和内存占用极低。',
      tech_sui_desc: '由智能合约保障的真实链上所有权，结合了 zkLogin 身份验证和 VRF 随机模块。',
      tech_walrus_desc: 'Mysten Labs 开发的去中心化存储协议，安全存储资产精灵图和富元数据二进制大对象。'
    },
    it: {
      section_badge: 'Integrazione Desktop Tauri & On-Chain',
      section_title: 'Interfaccia Desktop & Panoramica On-Chain',
      section_desc: 'Sperimenta una fusione perfetta tra animazioni desktop interattive e protocolli di transazione on-chain sicuri alimentati dalla blockchain SUI.',
      bento1_title: 'Agente IA & Automazione On-Chain',
      bento1_desc: 'Scambia asset all\'istante, consulta i saldi del portafoglio e firma transazioni sicure direttamente dalla chat del tuo pet. Ottimizzato da SUI Move PTB.',
      bento2_title: 'Compagno Desktop Tauri',
      bento2_desc: 'Esegue nativamente nella barra di sistema con un sidecar Rust. Utilizza memoria RAM e CPU minime per una concentrazione ininterrotta.',
      bento3_title: 'Avvisi Intelligenti',
      bento3_desc: 'Ottieni notifiche istantanee per eventi di blocco, completamenti di transazioni e timer di concentrazione tramite notifiche di sistema.',
      how_it_works: 'Come Funziona',
      how_it_works_desc: 'Avvia il tuo compagno IA personalizzato in 3 semplici passaggi',
      step1_title: 'Scarica il Client',
      step1_desc: 'Scarica il client per la tua piattaforma. Il modello IA Qwen (ottimizzato sui dati della blockchain SUI) funziona completamente offline.',
      step2_title: 'Collega il Portafoglio',
      step2_desc: 'Utilizza Google zkLogin per sincronizzare in modo sicuro il tuo indirizzo del wallet e autenticare gli asset on-chain.',
      step3_title: 'Diventa Autonomo',
      step3_desc: 'Chatta con il tuo compagno, attiva sessioni di concentrazione o avvia trasferimenti di token offline.',
      tech_stack_title: 'Stack Tecnologico Web3 Solido',
      tech_stack_desc: 'Potenziare l\'economia dei pet virtuali con strumenti all\'avanguardia',
      tech_tauri_desc: 'Shell desktop nativa che mantiene un consumo minimo di CPU e memoria tramite sidecar Rust.',
      tech_sui_desc: 'Proprietà reale on-chain protetta da smart contract, sfruttando l\'autenticazione zkLogin e il modulo casuale VRF.',
      tech_walrus_desc: 'Protocollo di archiviazione decentralizzato di Mysten Labs che conserva in modo sicuro spritesheet e metadati.'
    },
    fr: {
      section_badge: 'Intégration Tauri Desktop & On-Chain',
      section_title: 'Interface de Bureau & Aperçu On-Chain',
      section_desc: 'Découvrez une fusion fluide entre animations de bureau interactives et protocoles de transaction on-chain sécurisés alimentés par la blockchain SUI.',
      bento1_title: 'Agent IA & Automatisation On-Chain',
      bento1_desc: 'Échangez instantanément des actifs, consultez vos soldes et signez des transactions sécurisées directement depuis le chat de votre compagnon. Propulsé par SUI Move PTBs.',
      bento2_title: 'Compagnon de Bureau Tauri',
      bento2_desc: 'S\'exécute nativement dans votre barre système grâce à un sidecar Rust. Utilise un minimum de RAM et de CPU pour rester concentré.',
      bento3_title: 'Alertes Intelligentes',
      bento3_desc: 'Recevez des notifications instantanées pour les événements de blocs, la finalisation des transactions et les minuteurs Pomodoro via des toats système.',
      how_it_works: 'Comment ça Marche',
      how_it_works_desc: 'Lancez votre compagnon IA personnalisé en 3 étapes simples',
      step1_title: 'Télécharger le Client',
      step1_desc: 'Téléchargez le client pour votre plateforme. Le modèle IA Qwen (entraîné sur la blockchain SUI) fonctionne entièrement hors ligne.',
      step2_title: 'Connecter le Portefeuille',
      step2_desc: 'Utilisez Google zkLogin pour synchroniser en toute sécurité l\'adresse de votre portefeuille et authentifier vos actifs on-chain.',
      step3_title: 'Devenir Autonome',
      step3_desc: 'Discutez avec votre compagnon, activez des sessions de concentration ou déclenchez des transferts de jetons hors ligne.',
      tech_stack_title: 'Stack Technique Web3 Robuste',
      tech_stack_desc: 'Renforcer l\'économie des animaux virtuels avec des outils de pointe',
      tech_tauri_desc: 'Shell de bureau natif maintenant l\'empreinte CPU et mémoire extrêmement basse grâce au sidecar Rust.',
      tech_sui_desc: 'Véritable propriété sur la chaîne sécurisée par contrats intelligents, utilisant l\'authentification zkLogin et le module aléatoire VRF.',
      tech_walrus_desc: 'Protocole de stockage décentralisé par Mysten Labs conservant en toute sécurité les spritesheets et métadonnées.'
    },
    ko: {
      section_badge: 'Tauri 데스크톱 및 온체인 통합',
      section_title: '데스크톱 인터페이스 및 온체인 개요',
      section_desc: 'SUI 블록체인으로 구동되는 안전한 온체인 트랜잭션 프로토콜과 대화형 데스크톱 애니메이션 간의 매끄러운 융합을 경험해 보세요.',
      bento1_title: 'AI 에이전트 및 온체인 자동화',
      bento1_desc: '펫 채팅창에서 직접 자산을 즉시 스왑하고, 지갑 잔액을 조회하며, 안전하게 거래에 서명하세요. SUI Move PTB로 작동합니다.',
      bento2_title: 'Tauri 데스크톱 동반자',
      bento2_desc: 'Rust 사이드카를 사용하여 시스템 트레이에서 기본적으로 실행됩니다. 끊김 없는 집중을 위해 최소한의 RAM과 CPU를 사용합니다.',
      bento3_title: '지능형 알림',
      bento3_desc: '시스템 토스트 알림을 통해 블록 이벤트, 트랜잭션 완료 및 집중 타이머에 대한 즉각적인 알림을 받으세요.',
      how_it_works: '작동 원리',
      how_it_works_desc: '단 3단계만으로 맞춤형 AI 동반자를 실행하세요',
      step1_title: '클라이언트 다운로드',
      step1_desc: '해당 플랫폼용 클라이언트를 다운로드하세요. Qwen AI 모델(SUI 블록체인 데이터로 미세 조정됨)은 완전히 오프라인으로 실행됩니다.',
      step2_title: '지갑 연결',
      step2_desc: 'Google zkLogin을 사용하여 지갑 주소를 안전하게 동기화하고 온체인 자산을 인증하세요.',
      step3_title: '자율 실행',
      step3_desc: '펫 동반자와 대화하고, 집중 세션을 활성화하거나 오프라인 토큰 전송을 트리거하세요.',
      tech_stack_title: '강력한 Web3 기술 스택',
      tech_stack_desc: '최첨단 도구로 가상 펫 경제 활성화',
      tech_tauri_desc: 'Rust 사이드카를 통해 CPU 및 메모리 사용량을 매우 낮게 유지하는 네이티브 데스크톱 쉘입니다.',
      tech_sui_desc: 'zkLogin 인증 및 VRF 랜덤 모듈을 활용하여 스마트 계약으로 보호되는 실제 온체인 소유권입니다.',
      tech_walrus_desc: '자산 스프라이트 시트와 메타데이터 블롭을 안전하게 보관하는 Mysten Labs의 탈중앙화 스토리지 프로토콜입니다.'
    }
  };

  const text = dict[currentLangCode] || dict['en'];

  return (
    <section id="features" className="pb-10 md:pb-20 bg-transparent relative">
      <div className="section-divider bg-slate-100" />
 
      <Container className="pt-10 md:pt-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-4">
            <Laptop size={12} className="text-slate-500" />
            <span>{text.section_badge}</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] font-black text-slate-900 tracking-tight leading-tight mb-4">
            {text.section_title}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {text.section_desc}
          </p>
        </div>
 
        {/* Premium Bento Grid Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto mb-16">
          
          {/* Bento Item 1: Large Main Feature (Spans 2 columns) */}
          <div className="lg:col-span-2 relative group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 pointer-events-none" />
            
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                  <Cpu size={20} />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {text.bento1_title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-[12px] sm:text-[13px] lg:text-[14px]">
                  {text.bento1_desc}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 text-[11px] font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full">SUI MOVE PTB</span>
                  <span className="px-4 py-1.5 text-[11px] font-bold font-mono text-purple-600 bg-purple-50 border border-purple-100 rounded-full">LLM CHAT</span>
                </div>
              </div>
              <div className="flex-1 w-full max-w-sm mx-auto md:max-w-none">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-700">
                  <div className="p-3.5 border-b border-slate-800 bg-slate-900 flex items-center gap-2">
                     <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"/><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"/><div className="w-3 h-3 rounded-full bg-[#27c93f]"/></div>
                     <span className="text-xs font-mono text-slate-400 font-bold ml-3 tracking-wider">minipet-agent</span>
                  </div>
                  <div className="p-4 sm:p-6 space-y-4 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-slate-900 min-h-[160px] sm:min-h-[220px] flex flex-col justify-end relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 pointer-events-none" />
                    <div className="relative z-10 flex gap-3 text-[11px] sm:text-[13px] font-mono text-slate-300 bg-slate-800 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-700/50 w-[95%] sm:w-[90%] shadow-lg transform -translate-y-1 sm:-translate-y-2 opacity-90">
                      <span className="text-emerald-400">❯</span>
                      <span>swap 10 SUI to USDC</span>
                    </div>
                    <div className="relative z-10 flex gap-2 text-[11px] sm:text-[13px] font-mono text-white bg-indigo-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-500/50 w-[98%] sm:w-[95%] ml-auto shadow-xl shadow-indigo-500/20">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 opacity-90"><span className="animate-pulse block w-2 h-2 bg-white rounded-full"/> Splitting SUI gas coin...</p>
                        <p className="text-emerald-300 font-bold flex items-center gap-2"><span>✓</span> Executed successfully!</p>
                        <p className="text-[10px] text-indigo-200 mt-1 opacity-80">Tx: 0x9a2c...8f2b</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          {/* Bento Item 2: Tauri Desktop Engine */}
          <div className="relative group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 to-white pointer-events-none" />
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 mb-5">
                <Laptop size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 tracking-tight">
                {text.bento2_title}
              </h3>
              <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed flex-1">
                {text.bento2_desc}
              </p>
              
              <div className="mt-8 flex justify-center items-center p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative overflow-hidden transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(#80808010_1px,transparent_1px)] bg-[size:12px_12px]" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white border border-orange-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-orange-400">
                    <span className="text-[11px] font-black text-orange-600 tracking-wider">RUST</span>
                  </div>
                  <div className="relative w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 w-full h-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white border border-rose-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-rose-400">
                    <span className="text-[11px] font-black text-rose-600 tracking-wider">WEB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          {/* Bento Item 3: Intelligent Alerts */}
          <div className="relative group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-white pointer-events-none" />
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 tracking-tight">
                {text.bento3_title}
              </h3>
              <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed flex-1">
                {text.bento3_desc}
              </p>
              
              <div className="mt-8 space-y-4 relative">
                <div className="absolute left-8 top-8 bottom-4 w-px bg-slate-100 -z-10" />
                
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 flex items-center gap-3 sm:gap-4 transform transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:translate-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 text-emerald-500">
                    <ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-900 truncate">Tx Verified</p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate mt-0.5">10 SUI swapped to USDC</p>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400">now</div>
                </div>
                
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 flex items-center gap-3 sm:gap-4 transform transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:translate-x-4 delay-75">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100 text-amber-500">
                    <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-900 truncate">Focus Complete</p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate mt-0.5 font-mono text-emerald-600">+12.4 MIPET</p>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400">2m</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
 
        {/* Zone 2: How It Works */}
        <div className="mb-16 relative">
          <div className="text-center mb-16">
            <h3 className="text-[24px] sm:text-[30px] font-black text-slate-900 tracking-tight leading-tight">
              {text.how_it_works}
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mt-3 font-medium">
              {text.how_it_works_desc}
            </p>
          </div>
 
          <div className="relative max-w-7xl mx-auto">
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-px bg-slate-200 -z-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white border border-slate-100 shadow-sm p-4 sm:p-5 rounded-2xl group hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[11px] sm:text-[12px] mb-3 sm:mb-4 border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">1</div>
                <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 mb-1.5 sm:mb-2">{text.step1_title}</h4>
                <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed font-medium">
                  {text.step1_desc}
                </p>
              </div>
 
              {/* Step 2 */}
              <div className="bg-white border border-slate-100 shadow-sm p-4 sm:p-5 rounded-2xl group hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[11px] sm:text-[12px] mb-3 sm:mb-4 border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">2</div>
                <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 mb-1.5 sm:mb-2">{text.step2_title}</h4>
                <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed font-medium">
                  {text.step2_desc}
                </p>
              </div>
 
              {/* Step 3 */}
              <div className="bg-white border border-slate-100 shadow-sm p-4 sm:p-5 rounded-2xl group hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[11px] sm:text-[12px] mb-3 sm:mb-4 border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">3</div>
                <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 mb-1.5 sm:mb-2">{text.step3_title}</h4>
                <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed font-medium">
                  {text.step3_desc}
                </p>
              </div>
 
            </div>
          </div>
        </div>
 
        {/* Zone 3: Bento Tech Stack Cards */}
        <div className="relative">
          <div className="text-center mb-16">
            <h3 className="text-[24px] sm:text-[30px] font-black text-slate-900 tracking-tight leading-tight">
              {text.tech_stack_title}
            </h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mt-3 font-medium">
              {text.tech_stack_desc}
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            
            {/* Tauri Card */}
            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[200px] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-orange-100">
                  <Terminal size={18} />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2">Tauri Native Engine</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  {text.tech_tauri_desc}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-orange-50 border border-orange-100 text-orange-600 uppercase">
                  RUST / WRAPPER
                </span>
              </div>
            </div>
 
            {/* Sui Card */}
            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[200px] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-100">
                  <Shield size={18} />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2">Sui Blockchain</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  {text.tech_sui_desc}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-cyan-50 border border-cyan-100 text-cyan-600 uppercase">
                  MOVE / ACCOUNT
                </span>
              </div>
            </div>
 
            {/* Walrus Card */}
            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[200px] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-rose-100">
                  <Database size={18} />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2">Walrus Protocol</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  {text.tech_walrus_desc}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-rose-50 border border-rose-100 text-rose-600 uppercase">
                  WALRUS / STORAGE
                </span>
              </div>
            </div>
 
          </div>
        </div>
 
      </Container>
    </section>
  );
};
