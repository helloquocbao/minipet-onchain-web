import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      seo: {
        title: 'MiniPet - Your Cute Desktop Pixel Companion',
        description: 'MiniPet is a lightweight desktop app that brings cute pixel friends to your workspace. Boost productivity with Pomodoro and enjoy interactive desktop pets.',
        keywords: 'minipet, minipets, mini pet, mini pets, mini pet app, mini pet apps, virtual pet, qbao, desktop pet, pixel pet, pomodoro timer, desktop companion, screen pet, interactive pet, minipet official, minipet website'
      },
      nav: {
        features: 'Features',
        docs: 'Custom Pets',
        download: 'Download Free',
        market: 'Market',
        admin: 'Admin Hub',
        profile: 'Profile',
        mint_custom: 'Mint Custom Pet',
        logout: 'Log Out',
        sync: 'zkLogin / Sync',
        connect: 'Connect Wallet'
      },
      wallet: {
        modal_title: 'Connect your wallet',
        modal_subtitle: 'Choose a method to sync your wallet with MiniPet'
      },
      hero: {
        title1: 'Meet your new',
        title2: 'desktop',
        title3: 'companions.',
        desc: 'MiniPet is a lightweight desktop app that brings cute pixel friends to your workspace. They walk, talk, and even "eat" your unwanted files while you work.',
        getFree: 'Get MiniPet Free',
        source: 'Source Code',
        noAds: 'No Ads',
        noAccount: 'No Account Needed',
        privacy: '100% Privacy'
      },
      features: {
        badge: 'Small companion, big joy',
        desc: 'A simple, delightful desktop companion designed to keep you productive and smiling throughout the day.',
        companion: {
          title: 'Live Desktop Companion',
          desc: 'Your pixel pet lives right on your screen — walking, talking, and bringing joy to every work session.'
        },
        pomodoro: {
          title: 'Pomodoro Timer',
          desc: 'Customisable work/break cycles with your pet — gently nudging you when it\'s time to rest.'
        },
        multi: {
          title: 'Multi-Pet Support',
          desc: 'Why settle for one? Spawn multiple pets with unique personalities and watch them interact with each other.'
        },
        eating: {
          title: 'File Eating System',
          desc: 'A fun and interactive way to clean your workspace. Simply drag unwanted files onto your pet and watch them disappear.'
        },
        custom: {
          title: 'PetDex & Custom Pets',
          desc: 'Import from our massive PetDex library or upload your own pixel art to create a truly unique companion.'
        },
        focus_mode: 'Focus mode'
      },
      download: {
        title: 'Ready to meet your companion?',
        desc: 'Choose your platform and start your journey with MiniPet today. It\'s free and always will be.',
        macDesc: 'Supports Intel & Apple Silicon',
        winExeDesc: 'Standard installer for Windows',
        winZipDesc: 'Portable version (No install)',
        btn: 'Download',
        coming_soon: 'Coming Soon',
        version: 'Version',
        troubleshooting: {
          macTitle: 'Getting "App is damaged" or "Unidentified Developer" on Mac?',
          macStep1: 'Don\'t worry! It\'s because the app is unsigned. To open it:',
          macStep2: 'Open your "Applications" folder in Finder (not Launchpad).',
          macStep3: 'Right-click MiniPet and select "Open" from the menu, then click "Open" again in the dialog.',
          macTerminalTitle: 'Still can\'t open?',
          macTerminalStep: 'Ensure MiniPet is in Applications folder, then run: xattr -cr /Applications/MiniPet.app'
        }
      },
      docs: {
        back: 'Back to Home',
        title: 'Custom Pet Standard',
        desc: 'Guide on file structure for uploading your custom pets to the MiniPet system.',
        section1: 'Folder Structure',
        section1_desc: 'A complete pet must include 2 required files in a single folder:',
        section2: 'Spritesheet (9 Rows)',
        section2_desc: 'The spritesheet.webp image must be divided into 9 fixed rows:',
        table: {
          row: 'Row',
          action: 'Action',
          desc: 'Detail Description',
          idle: 'Stay still and wait.',
          walkR: 'Walk to the right.',
          walkL: 'Walk to the left.',
          greet: 'Greet the user.',
          action_spec: 'Special action (Eat file, jump...).',
          failed: 'Sad, disappointed, or dropped.',
          waiting: 'Waiting too long, sleeping, or being picked up.',
          running: 'Run fast.',
          review: 'For preview features.'
        },
        section3: 'Default Direction',
        section3_desc: 'By default, the system assumes all images are facing right. The system will automatically flip the image when the pet moves left.',
        section3_note: 'Important: If your character faces Left by default, you must add "facingRight": false to your pet.json file.',
        section4: 'Real Example: Black Wukong',
        section4_desc: 'A complete character sample for your reference.',
        spritesheet_sample: 'Spritesheet Sample',
        scroll_note: 'Scroll to see all 9 rows →',
        json_config: 'pet.json Configuration'
      },
      footer: {
        disclaimer: 'Disclaimer:',
        disclaimer_text: 'This application only provides tools; we do not own and are not responsible for content/images uploaded by users or linked from external sources.',
        copyright: 'Open Source Project.'
      },
      market: {
        nav_badge: 'Official Store',
        title: 'Adopt a Companion',
        desc: 'Choose from our official collection of pixel pets. Each one is a unique NFT on the Sui blockchain.',
        custom_slot: {
          title: 'Custom Pet Slot',
          desc: 'Design your own pixel friend'
        },
        pet_card: {
          loyal_companion: 'A loyal companion with {{energy}}. Ready to brighten up your workspace!',
          mythical_powers: 'mythical powers',
          fluffy_energy: 'fluffy energy',
          adopt_btn: 'Adopt Now'
        },
        mint_section: {
          title: 'Not finding your perfect pet?',
          desc: 'Purchase a Mint Slot and upload your own spritesheet to create a truly one-of-a-kind companion that only you own.',
          buy_btn: 'Buy Mint Slot',
          view_guide: 'View Guide'
        },
        alerts: {
          need_mipet: 'You need MIPET tokens to buy a mint slot!',
          buy_pet_success: 'Adopted pet successfully! Check your Desktop App or Profile.',
          buy_slot_success: 'Mint Slot purchased successfully! Redirecting to creator...',
          buy_custom_slot_success: 'Mint Slot purchased successfully! Redirecting to customize your pet...',
          has_slot: 'You already have a Mint Slot! Redirecting to customization page...',
          has_slot_custom: 'You already have a Mint Slot! Redirecting to customization page with this pet pre-filled...',
          buy_failed: 'Transaction failed or was rejected: {{error}}'
        }
      },
      custom: {
        back: 'Back',
        title: 'Mint Custom Pet',
        subtitle: 'Create your unique decentralized pet',
        no_slot: {
          title: 'No Mint Slot Found',
          desc: 'You need to purchase a Mint Slot in the Market first.',
          go_market: 'Go to Market'
        },
        form: {
          name_label: 'Pet Name',
          name_placeholder: 'Ex: Cyber Kitty',
          avatar_label: 'Avatar Image',
          sprite_label: 'Animation Sheet',
          upload_hint: 'Choose File',
          uploaded_hint: 'Uploaded to Walrus',
          sponsor_badge: 'Admin Sponsored',
          sponsor_desc: 'Your upload fees are covered! Your pet will be stored on Walrus permanently.',
          mint_btn: 'Mint Custom Pet'
        },
        alerts: {
          mint_success: 'Custom Pet Minted! Sponsored by Admin ✨',
          upload_failed: 'Failed to upload to Walrus. Please try again.',
          sponsor_unavailable: 'Admin sponsorship is currently unavailable.',
          mint_failed: 'Failed to mint custom pet: {{error}}'
        },
        preview: {
          title: 'Live Animation Preview',
          desc: 'Test your pet animations before minting onto the blockchain.',
          no_sprite: 'No Spritesheet Uploaded',
          frames_per_row: 'Frames per Row',
          guidelines_title: 'Spritesheet Guidelines',
          guide_1: 'The Spritesheet image must contain exactly 9 rows of frames for each character state.',
          guide_2: 'Every row must have the same number of frames (columns). Default is 4 columns.',
          guide_3: 'Characters should face Right by default for proper animation alignment.',
          view_docs: 'View Full Documentation'
        }
      },
      admin: {
        title: 'Admin Hub',
        subtitle: 'Manage the MiniPet ecosystem',
        tabs: {
          overview: 'Overview',
          store: 'Store',
          economy: 'Economy',
          system: 'System'
        },
        dashboard: {
          package_id: 'Package ID',
          mipet_token: 'MIPET Token',
          status: 'Admin Status',
          authorized: 'AUTHORIZED',
          custom_mint_progress: 'Custom Pets Minted',
          slot_price: 'Custom Slot Price',
          slot_price_desc: 'Fee required for users to custom mint',
          treasury_addr: 'Treasury Recipient',
          treasury_desc: 'Receives all slot purchase fees',
          welcome: 'Welcome back, Admin',
          welcome_desc: 'Use the navigation above to manage the Pet Store, mint MIPET tokens, or adjust global system parameters like fees and limits.'
        },
        store: {
          add_title: 'Add New Pet Template',
          pet_name: 'Pet Name',
          price: 'Price (SUI)',
          main_image: 'Main Image (PNG)',
          sprite_sheet: 'Sprite Sheet (PNG)',
          uploading: 'Uploading...',
          uploaded: 'Uploaded',
          choose_file: 'Choose File',
          confirm_btn: 'Confirm and Add to Store'
        },
        economy: {
          mint_title: 'Mint MIPET Tokens',
          recipient: 'Recipient Address',
          amount: 'Amount (MIPET)',
          mint_btn: 'Mint',
          treasury_title: 'Treasury Management',
          new_treasury: 'New Treasury Address',
          update_btn: 'Update',
          treasury_note: 'Note: This address will receive all fees from Store purchases and Custom Slot sales.'
        },
        system: {
          title: 'System Configuration',
          fee_label: 'Base Custom Slot Fee (MIPET)',
          save_btn: 'Save Changes',
          limit_label: 'Increase Custom Pet Mint Limit',
          increase_btn: 'Increase Limit',
          limit_desc: 'Current active limit: {{current}} custom pets.',
          warning: 'Warning',
          warning_desc: 'Adjusting these parameters affects the entire economy. Changes are immediate on the blockchain.'
        },
        alerts: {
          template_success: 'Template created successfully!',
          tokens_minted: 'Tokens minted!',
          treasury_updated: 'Treasury updated!',
          config_updated: 'Config updated!',
          upload_failed: 'Failed to upload to Walrus.',
          limit_increased: 'Custom pet limit increased successfully!'
        },
        auth: {
          checking: 'Verifying admin permissions...',
          connect_admin_wallet: 'Connect Admin Wallet to Continue',
          unauthorized_title: 'Access Denied',
          unauthorized_desc: 'Only the admin wallet that owns the AdminCap can access the admin dashboard.',
          wallet_connected: 'Connected Wallet:'
        }
      },
      not_found: {
        title: 'Page Not Found',
        desc: 'Oops! The pet you\'re looking for has wandered off into the digital wilderness.',
        back_home: 'Return Home'
      },
      pet_features: {
        title: "MiniPet Features Showcase",
        subtitle: "Explore the amazing capabilities of your desktop pixel companions",
        hero_desc: "MiniPet is not just an ordinary screen pet. It is a smart AI assistant, a productivity partner, and a decentralized web3 companion.",
        sections: {
          ai_chat: {
            title: "AI Chat Assistant",
            desc: "Double-click your pet to open the chat window. Engage in conversations, ask questions, write code, or just chat. The AI is always on and ready to help, running seamlessly in the background."
          },
          pomodoro: {
            title: "Pomodoro Focus Timer",
            desc: "Stay productive with customizable Pomodoro cycles. Your pet works when you work, sleeps when you rest, and gently alerts you when it's time to take a break. No more boring timers!"
          },
          file_eater: {
            title: "Interactive File Eating",
            desc: "Declutter your desktop in a fun way. Simply drag any unwanted file over your pet. Watch them happily eat the file, which instantly moves it to your system's Recycle Bin/Trash."
          },
          multi_pet: {
            title: "Multi-Pet Playground",
            desc: "Spawn multiple pets simultaneously. Each pet operates independently with its own window, running, jumping, and playing. They will interact with each other, creating a lively pixel community on your screen."
          },
          custom_creator: {
            title: "Custom Pet Creator (Sui + Walrus)",
            desc: "Design your own pixel companion. Purchase a Mint Slot using MIPET, upload your spritesheet, and mint a custom pet NFT. The asset is stored permanently on Walrus decentralized storage, giving you absolute ownership."
          },
          interactivity: {
            title: "Physics & Mouse Interactions",
            desc: "Your pets aren't static images. Drag them to pick them up, watch them fall back down with gravity physics, or let them roam along the bottom of your screen. They adapt to your screen resolution dynamically."
          }
        },
        commands: {
          title: "Pet Commands & Animations",
          desc: "Test out how your pet reacts to different commands. Click any action below to preview the animations and actions of your pixel friend.",
          preview_box: "Sprite Preview",
          actions: {
            idle: "Idle / Rest",
            walk: "Walking",
            run: "Running",
            greet: "Greeting / Wave",
            eat: "Eat File",
            sad: "Sad / Failed",
            sleep: "Sleeping",
            pickup: "Pick Up"
          },
          action_descs: {
            idle: "The pet stays still, looking around or blinking, waiting for your next command.",
            walk: "The pet walks gently across the bottom boundary of your desktop screen.",
            run: "The pet runs fast, showcasing high energy. Great for chase animations!",
            greet: "The pet waves or bows to greet you, bringing warmth to your workspace.",
            eat: "The pet opens its mouth and performs an eating animation to consume drag-dropped files.",
            sad: "Triggered when a task fails or the pet is disappointed. Pixel tears may flow!",
            sleep: "Activated during Pomodoro breaks or after long idle periods. Sweet dreams!",
            pickup: "When you drag the pet with your mouse, it switches to a hanging/flying animation state."
          }
        },
        how_to: {
          title: "How to Control Your Pet",
          step1: "Double-Click: Open or close the AI chat bubble to talk to your pet.",
          step2: "Click & Drag: Drag your pet anywhere on your screen. Release to let it fall with gravity.",
          step3: "Drag Files: Hover a desktop file over your pet to 'feed' it and send the file to the Recycle Bin.",
          step4: "Right-Click: Access the pet's context menu to customize settings, switch skins, start Pomodoro, or exit."
        }
      }
    }
  },
  vi: {
    translation: {
      seo: {
        title: 'MiniPet - Những người bạn Pixel đáng yêu trên máy tính',
        description: 'MiniPet là ứng dụng máy tính nhẹ nhàng mang những người bạn pixel đến không gian làm việc của bạn. Tăng năng suất với Pomodoro và tận hưởng niềm vui với thú cưng máy tính.',
        keywords: 'minipet, minipets, mini pet, mini pets, mini pet app, mini pet apps, virtual pet, qbao, thú cưng máy tính, pet máy tính, pixel pet, pomodoro, bạn đồng hành máy tính, thú cưng ảo, minipet chính thức'
      },
      nav: {
        features: 'Tính năng',
        docs: 'Custom Pets',
        download: 'Tải miễn phí',
        market: 'Cửa hàng',
        admin: 'Quản trị',
        profile: 'Cá nhân',
        mint_custom: 'Tạo Pet mới',
        logout: 'Đăng xuất',
        sync: 'Đồng bộ ví / zkLogin',
        connect: 'Kết nối ví'
      },
      wallet: {
        modal_title: 'Kết nối ví của bạn',
        modal_subtitle: 'Chọn phương thức phù hợp để liên kết tài sản của bạn với MiniPet'
      },
      hero: {
        title1: 'Gặp gỡ những',
        title2: 'người bạn',
        title3: 'máy tính mới.',
        desc: 'MiniPet là ứng dụng máy tính nhẹ nhàng mang những người bạn pixel đáng yêu đến không gian làm việc của bạn. Chúng biết đi, nói và thậm chí "ăn" những file rác của bạn.',
        getFree: 'Tải MiniPet miễn phí',
        source: 'Mã nguồn',
        noAds: 'Không quảng cáo',
        noAccount: 'Không cần tài khoản',
        privacy: 'Riêng tư 100%'
      },
      features: {
        badge: 'Bạn nhỏ, niềm vui lớn',
        desc: 'Một người bạn máy tính đơn giản, thú vị được thiết kế để giúp bạn làm việc hiệu quả và luôn mỉm cười.',
        companion: {
          title: 'Bạn đồng hành trực tiếp',
          desc: 'Thú cưng pixel sống ngay trên màn hình của bạn — đi bộ, trò chuyện và mang lại niềm vui cho mỗi phiên làm việc.'
        },
        pomodoro: {
          title: 'Đồng hồ Pomodoro',
          desc: 'Chu kỳ làm việc/nghỉ ngơi có thể tùy chỉnh với thú cưng — nhắc nhở nhẹ nhàng khi đến lúc nghỉ ngơi.'
        },
        multi: {
          title: 'Hỗ trợ nhiều Pet',
          desc: 'Tại sao phải chọn một? Nuôi nhiều pet với cá cá tính riêng biệt và xem chúng tương tác với nhau.'
        },
        eating: {
          title: 'Hệ thống ăn File',
          desc: 'Cách dọn dẹp màn hình vui nhộn và tương tác. Chỉ cần kéo các file không dùng tới vào pet và xem chúng biến mất.'
        },
        custom: {
          title: 'PetDex & Custom Pets',
          desc: 'Nhập từ thư viện PetDex khổng lồ hoặc tải lên pixel art của riêng bạn để tạo ra một người bạn thực sự độc đáo.'
        },
        focus_mode: 'Chế độ tập trung'
      },
      download: {
        title: 'Sẵn sàng gặp gỡ bạn đồng hành?',
        desc: 'Chọn nền tảng của bạn và bắt đầu hành trình với MiniPet ngay hôm nay. Hoàn toàn miễn phí.',
        macDesc: 'Hỗ trợ Intel & Apple Silicon',
        winExeDesc: 'Bản cài đặt tiêu chuẩn cho Windows',
        winZipDesc: 'Bản Portable (Không cần cài đặt)',
        btn: 'Tải về',
        coming_soon: 'Sắp ra mắt',
        version: 'Phiên bản',
        troubleshooting: {
          macTitle: 'Gặp lỗi "App is damaged" hoặc "Unidentified Developer" trên Mac?',
          macStep1: 'Đừng lo! Đó là vì ứng dụng chưa được ký xác thực. Để mở:',
          macStep2: 'Mở thư mục "Applications" (Ứng dụng) bằng Finder (không dùng Launchpad).',
          macStep3: 'Nhấn chuột phải vào MiniPet chọn "Mở" (Open), sau đó nhấn "Mở" thêm lần nữa ở hộp thoại xác nhận.',
          macTerminalTitle: 'Vẫn không mở được?',
          macTerminalStep: 'Đảm bảo đã kéo MiniPet vào Applications, sau đó chạy: xattr -cr /Applications/MiniPet.app'
        }
      },
      docs: {
        back: 'Quay lại trang chủ',
        title: 'Quy chuẩn Custom Pet',
        desc: 'Hướng dẫn cấu trúc file để upload thú cưng tùy chỉnh (Custom Pet) của bạn lên hệ thống MiniPet.',
        section1: 'Cấu trúc thư mục',
        section1_desc: 'Một thú cưng hoàn chỉnh cần bao gồm 2 file bắt buộc đặt chung trong một thư mục:',
        section2: 'Spritesheet (9 Dòng)',
        section2_desc: 'File ảnh spritesheet.webp phải được chia thành 9 dòng cố định:',
        table: {
          row: 'Dòng',
          action: 'Hành động',
          desc: 'Mô tả chi tiết',
          idle: 'Đứng im chờ đợi.',
          walkR: 'Đi bộ sang hướng phải.',
          walkL: 'Đi bộ sang hướng trái.',
          greet: 'Chào hỏi người dùng.',
          action_spec: 'Hành động đặc biệt (Ăn file, nhảy...).',
          failed: 'Buồn bã, thất vọng, hoặc bị rơi.',
          waiting: 'Đợi quá lâu, đi ngủ, hoặc bị nhấc lên.',
          running: 'Chạy nhanh.',
          review: 'Dành cho các tính năng xem trước.'
        },
        section3: 'Hướng mặc định',
        section3_desc: 'Theo mặc định, hệ thống sẽ ngầm hiểu tất cả các hình ảnh đang quay mặt sang phải. Hệ thống sẽ tự động lật ngược hình khi pet di chuyển sang trái.',
        section3_note: 'Quan trọng: Nếu nhân vật quay mặt sang Trái mặc định, bạn phải thêm "facingRight": false vào file pet.json.',
        section4: 'Ví dụ thực tế: Black Wukong',
        section4_desc: 'Mẫu nhân vật hoàn chỉnh để bạn tham khảo.',
        spritesheet_sample: 'Mẫu Spritesheet',
        scroll_note: 'Cuộn để xem toàn bộ 9 dòng →',
        json_config: 'Cấu hình pet.json'
      },
      footer: {
        disclaimer: 'Miễn trừ trách nhiệm:',
        disclaimer_text: 'Ứng dụng này chỉ cung cấp công cụ; chúng tôi không sở hữu và không chịu trách nhiệm về nội dung/hình ảnh do người dùng tải lên hoặc liên kết từ các nguồn bên ngoài.',
        copyright: 'Dự án Mã nguồn mở.'
      },
      market: {
        nav_badge: 'Cửa hàng chính thức',
        title: 'Nhận nuôi bạn đồng hành',
        desc: 'Chọn từ bộ sưu tập thú cưng pixel chính thức của chúng tôi. Mỗi con là một NFT duy nhất trên blockchain Sui.',
        custom_slot: {
          title: 'Ô tạo Pet tùy chỉnh',
          desc: 'Tự thiết kế người bạn pixel của riêng bạn'
        },
        pet_card: {
          loyal_companion: 'Một người bạn trung thành với {{energy}}. Sẵn sàng làm bừng sáng không gian làm việc của bạn!',
          mythical_powers: 'năng lượng thần thoại',
          fluffy_energy: 'năng lượng mềm mại',
          adopt_btn: 'Nhận nuôi ngay'
        },
        mint_section: {
          title: 'Không tìm thấy thú cưng ưng ý?',
          desc: 'Mua một ô đúc (Mint Slot) và tải lên spritesheet của riêng bạn để tạo ra một người bạn đồng hành thực sự độc nhất vô nhị mà chỉ bạn sở hữu.',
          buy_btn: 'Mua ô đúc (Mint Slot)',
          view_guide: 'Xem hướng dẫn'
        },
        alerts: {
          need_mipet: 'Bạn cần token MIPET để mua ô đúc!',
          buy_pet_success: 'Nhận nuôi thú cưng thành công! Hãy kiểm tra Ứng dụng Desktop hoặc trang Cá nhân.',
          buy_slot_success: 'Mua ô đúc (Mint Slot) thành công! Đang chuyển hướng đến trang tạo...',
          buy_custom_slot_success: 'Mua ô đúc (Mint Slot) thành công! Đang chuyển hướng đến trang chỉnh sửa...',
          has_slot: 'Bạn đã có sẵn ô đúc (Mint Slot)! Đang chuyển hướng đến trang tạo...',
          has_slot_custom: 'Bạn đã có sẵn ô đúc (Mint Slot)! Đang chuyển hướng đến trang chỉnh sửa thú cưng...',
          buy_failed: 'Giao dịch thất bại hoặc bị từ chối: {{error}}'
        }
      },
      custom: {
        back: 'Quay lại',
        title: 'Đúc Pet tùy chỉnh',
        subtitle: 'Tạo người bạn phi tập trung độc nhất của bạn',
        no_slot: {
          title: 'Không tìm thấy ô đúc',
          desc: 'Bạn cần mua một Ô đúc (Mint Slot) trong Cửa hàng trước.',
          go_market: 'Đến Cửa hàng'
        },
        form: {
          name_label: 'Tên thú cưng',
          name_placeholder: 'Ví dụ: Cyber Kitty',
          avatar_label: 'Ảnh đại diện',
          sprite_label: 'Bảng hoạt ảnh (Sprite Sheet)',
          upload_hint: 'Chọn tệp',
          uploaded_hint: 'Đã tải lên Walrus',
          sponsor_badge: 'Admin tài trợ',
          sponsor_desc: 'Phí tải lên của bạn đã được bao trả! Thú cưng của bạn sẽ được lưu trữ vĩnh viễn trên Walrus.',
          mint_btn: 'Đúc Pet tùy chỉnh'
        },
        alerts: {
          mint_success: 'Đã đúc Pet tùy chỉnh thành công! Được tài trợ bởi Admin ✨',
          upload_failed: 'Tải lên Walrus thất bại. Vui lòng thử lại.',
          sponsor_unavailable: 'Dịch vụ tài trợ của Admin hiện không khả dụng.',
          mint_failed: 'Đúc Pet tùy chỉnh thất bại: {{error}}'
        },
        preview: {
          title: 'Xem trước hoạt ảnh',
          desc: 'Kiểm tra chuyển động của Pet trước khi đúc lên Blockchain.',
          no_sprite: 'Chưa tải lên Spritesheet',
          frames_per_row: 'Số khung hình / dòng',
          guidelines_title: 'Quy chuẩn Spritesheet',
          guide_1: 'Hình ảnh Spritesheet phải được chia làm 9 dòng hoạt ảnh tương ứng với các trạng thái của Pet.',
          guide_2: 'Tất cả các dòng phải có cùng số lượng khung hình (Cột). Mặc định là 4 cột.',
          guide_3: 'Nhân vật nên hướng mặt sang bên Phải làm chuẩn.',
          view_docs: 'Xem tài liệu đầy đủ'
        }
      },
      admin: {
        title: 'Trung tâm Quản trị',
        subtitle: 'Quản lý hệ sinh thái MiniPet',
        tabs: {
          overview: 'Tổng quan',
          store: 'Cửa hàng',
          economy: 'Kinh tế',
          system: 'Hệ thống'
        },
        dashboard: {
          package_id: 'ID Gói (Package ID)',
          mipet_token: 'Token MIPET',
          status: 'Trạng thái Quản trị',
          authorized: 'ĐÃ XÁC THỰC',
          custom_mint_progress: 'Số Pet Custom đã đúc',
          slot_price: 'Giá mua Mint Slot',
          slot_price_desc: 'Mức phí người dùng cần trả để tự đúc Custom Pet',
          treasury_addr: 'Địa chỉ ví Treasury nhận phí',
          treasury_desc: 'Nhận tất cả phí thu được từ việc mua slot hoặc mua pet',
          welcome: 'Chào mừng trở lại, Admin',
          welcome_desc: 'Sử dụng thanh điều hướng phía trên để quản lý Cửa hàng, đúc token MIPET hoặc điều chỉnh các thông số hệ thống toàn cầu như phí và giới hạn.'
        },
        store: {
          add_title: 'Thêm mẫu Pet mới',
          pet_name: 'Tên thú cưng',
          price: 'Giá (SUI)',
          main_image: 'Ảnh chính (PNG)',
          sprite_sheet: 'Bảng hoạt ảnh (PNG)',
          uploading: 'Đang tải lên...',
          uploaded: 'Đã tải lên',
          choose_file: 'Chọn tệp',
          confirm_btn: 'Xác nhận và Thêm vào Cửa hàng'
        },
        economy: {
          mint_title: 'Đúc token MIPET',
          recipient: 'Địa chỉ người nhận',
          amount: 'Số lượng (MIPET)',
          mint_btn: 'Đúc',
          treasury_title: 'Quản lý Kho bạc',
          new_treasury: 'Địa chỉ Kho bạc mới',
          update_btn: 'Cập nhật',
          treasury_note: 'Lưu ý: Địa chỉ này sẽ nhận tất cả các khoản phí từ việc mua hàng trong Cửa hàng và bán Ô đúc tùy chỉnh.'
        },
        system: {
          title: 'Cấu hình Hệ thống',
          fee_label: 'Phí Ô đúc tùy chỉnh cơ bản (MIPET)',
          save_btn: 'Lưu thay đổi',
          limit_label: 'Tăng giới hạn đúc Pet Custom',
          increase_btn: 'Tăng giới hạn',
          limit_desc: 'Giới hạn kích hoạt hiện tại: {{current}} Pet Custom.',
          warning: 'Cảnh báo',
          warning_desc: 'Việc điều chỉnh các thông số này ảnh hưởng đến toàn bộ nền kinh tế. Các thay đổi có hiệu lực ngay lập tức trên blockchain.'
        },
        alerts: {
          template_success: 'Đã tạo mẫu thành công!',
          tokens_minted: 'Đã đúc token thành công!',
          treasury_updated: 'Đã cập nhật kho bạc!',
          config_updated: 'Đã cập nhật cấu hình!',
          upload_failed: 'Tải lên Walrus thất bại.',
          limit_increased: 'Đã tăng giới hạn đúc Pet Custom thành công!'
        },
        auth: {
          checking: 'Đang xác minh quyền admin...',
          connect_admin_wallet: 'Kết nối ví Admin để tiếp tục',
          unauthorized_title: 'Quyền truy cập bị từ chối',
          unauthorized_desc: 'Chỉ địa chỉ ví admin sở hữu AdminCap mới có quyền truy cập trang quản trị này.',
          wallet_connected: 'Ví đang kết nối:'
        }
      },
      not_found: {
        title: 'Không tìm thấy trang',
        desc: 'Rất tiếc! Thú cưng bạn đang tìm kiếm đã đi lạc vào vùng đất hoang kỹ thuật số.',
        back_home: 'Quay lại Trang chủ'
      },
      pet_features: {
        title: "Khám Phá Tính Năng MiniPet",
        subtitle: "Trải nghiệm những khả năng độc đáo của người bạn đồng hành pixel trên màn hình",
        hero_desc: "MiniPet không chỉ là một thú cưng màn hình thông thường. Nó là trợ lý AI thông minh, người bạn đồng hành tăng năng suất và một NFT phi tập trung Web3.",
        sections: {
          ai_chat: {
            title: "Trợ Lý Chat AI",
            desc: "Nhấp đúp vào pet của bạn để mở khung chat. Trò chuyện, đặt câu hỏi, viết code hoặc tán gẫu. Trợ lý AI luôn luôn bật và sẵn sàng hỗ trợ bạn bất cứ lúc nào ngay trên màn hình."
          },
          pomodoro: {
            title: "Đồng Hồ Pomodoro Tập Trung",
            desc: "Làm việc hiệu quả với chu kỳ Pomodoro có thể tùy chỉnh. Pet của bạn sẽ làm việc khi bạn tập trung, ngủ khi bạn nghỉ ngơi và nhắc nhở nhẹ nhàng khi đến giờ giải lao."
          },
          file_eater: {
            title: "Hệ Thống Ăn File Tương Tác",
            desc: "Dọn dẹp màn hình máy tính theo cách cực kỳ thú vị. Chỉ cần kéo bất kỳ file rác nào thả vào pet. Xem chúng ăn file và file đó sẽ được tự động chuyển vào Thùng rác (Trash) hệ điều hành."
          },
          multi_pet: {
            title: "Nuôi Nhiều Thú Cưng",
            desc: "Bạn có thể gọi nhiều pet xuất hiện cùng lúc trên màn hình. Mỗi pet hoạt động độc lập, đi lại, nhảy múa và tương tác, tạo nên một cộng đồng pixel sinh động ngay trên desktop của bạn."
          },
          custom_creator: {
            title: "Tự Thiết Kế Pet (Sui + Walrus)",
            desc: "Tự tạo thú cưng độc quyền của bạn. Mua Ô đúc (Mint Slot) bằng token MIPET, tải lên spritesheet hoạt ảnh và đúc NFT. Thú cưng sẽ được lưu trữ vĩnh viễn trên mạng lưới Walrus phi tập trung."
          },
          interactivity: {
            title: "Vật Lý & Tương Tác Chuột",
            desc: "Thú cưng có phản ứng vật lý thực tế. Bạn có thể dùng chuột nhấc pet lên, ném đi và xem chúng rơi xuống do trọng lực. Pet cũng tự động bám và di chuyển dọc theo thanh taskbar."
          }
        },
        commands: {
          title: "Hành Động & Hoạt Ảnh Của Pet",
          desc: "Xem trước cách thú cưng của bạn phản ứng với các lệnh khác nhau. Nhấn vào các hành động dưới đây để xem trước hoạt ảnh chuyển động dạng pixel.",
          preview_box: "Xem trước hoạt ảnh",
          actions: {
            idle: "Đứng im / Nghỉ",
            walk: "Đi bộ",
            run: "Chạy nhanh",
            greet: "Chào hỏi",
            eat: "Ăn file",
            sad: "Buồn bã",
            sleep: "Đi ngủ",
            pickup: "Nhấc lên"
          },
          action_descs: {
            idle: "Pet đứng im, nhìn xung quanh hoặc chớp mắt, chờ đợi hành động tiếp theo từ bạn.",
            walk: "Thú cưng đi bộ nhẹ nhàng dọc theo cạnh dưới màn hình máy tính của bạn.",
            run: "Thú cưng chạy nhanh với năng lượng tràn trề, thích hợp cho hoạt ảnh đuổi bắt.",
            greet: "Pet vẫy tay hoặc cúi chào bạn, mang lại niềm vui và sự ấm áp cho không gian làm việc.",
            eat: "Pet mở rộng miệng và thực hiện hoạt ảnh ăn để tiêu thụ các file bạn kéo thả vào.",
            sad: "Xuất hiện khi một tác vụ thất bại hoặc pet thất vọng. Những giọt nước mắt pixel có thể rơi!",
            sleep: "Kích hoạt khi đến giờ nghỉ Pomodoro hoặc sau thời gian dài không tương tác. Chúc pet ngủ ngon!",
            pickup: "Khi bạn dùng chuột kéo pet đi, pet sẽ chuyển sang trạng thái lơ lửng, chân co lại."
          }
        },
        how_to: {
          title: "Hướng Dẫn Ra Lệnh Cho Pet",
          step1: "Nhấp đúp chuột: Mở hoặc đóng bong bóng chat AI để trò chuyện trực tiếp.",
          step2: "Nhấp và kéo: Nhấc pet lên và di chuyển đi bất cứ đâu. Thả ra để pet rơi tự do theo trọng lực.",
          step3: "Kéo thả tệp: Di chuyển một file trên desktop đè lên pet để 'cho ăn' và xóa file đó vào Thùng rác.",
          step4: "Nhấp chuột phải: Mở menu ngữ cảnh để cấu hình cài đặt, đổi skin thú cưng, bắt đầu Pomodoro hoặc thoát."
        }
      }
    }
  },
  zh: {
    translation: {
      seo: {
        title: 'MiniPet - 您的可爱桌面像素伙伴',
        description: 'MiniPet 是一款轻量级的桌面应用程序，可为您的工作空间带来可爱的像素朋友。通过番茄钟提高生产力，享受互动的桌面宠物。',
        keywords: 'minipet, minipets, mini pet, mini pets, mini pet app, mini pet apps, virtual pet, qbao, 桌面宠物, 像素宠物, 番茄钟, 桌面伙伴, 虚拟宠物, 互动宠物, minipet 官方'
      },
      nav: {
        features: '功能',
        docs: '自定义宠物',
        download: '免费下载',
        market: '商店',
        admin: '管理中心',
        profile: '个人中心',
        mint_custom: '铸造自定义宠物',
        logout: '登出',
        sync: 'zkLogin / 同步钱包',
        connect: '连接钱包'
      },
      wallet: {
        modal_title: '连接您的钱包',
        modal_subtitle: '选择合适的方法将您的钱包与 MiniPet 关联'
      },
      hero: {
        title1: '遇见你的新',
        title2: '桌面',
        title3: '伙伴。',
        desc: 'MiniPet 是一款轻量级的桌面应用程序，可为您的工作空间带来可爱的像素朋友。它们会走、会说，甚至会在您工作时“吃掉”您不需要的文件。',
        getFree: '免费获取 MiniPet',
        source: '源代码',
        noAds: '无广告',
        noAccount: '无需账户',
        privacy: '100% 隐私保护'
      },
      features: {
        badge: '小伴侣，大快乐',
        desc: '一个简单、快乐的桌面伴侣，旨在让您在一天中保持高效并保持微笑。',
        companion: {
          title: '实时桌面伴侣',
          desc: '您的像素宠物就生活在您的屏幕上——行走、交谈，并为每次工作会议带来欢乐。'
        },
        pomodoro: {
          title: '番茄钟',
          desc: '与您的宠物一起定制工作/休息周期——在需要休息时轻轻提醒您。'
        },
        multi: {
          title: '多宠物支持',
          desc: '为什么要满足于一个？产生多个具有独特个性的宠物，并观察它们彼此互动。'
        },
        eating: {
          title: '文件吞噬系统',
          desc: '一种清理工作空间的有趣且互动的方式。只需将不需要的文件拖到您的宠物身上，然后看着它们消失。'
        },
        custom: {
          title: 'PetDex 和自定义宠物',
          desc: '从我们庞大的 PetDex 库中导入或上传您自己的像素艺术，以创建一个真正独特的伙伴。'
        }
      },
      download: {
        title: '准备好迎接你的伙伴了吗？',
        desc: '选择您的平台，立即开始您的 MiniPet 之旅。它是免费的，而且永远都是。',
        macDesc: '支持 Intel 和 Apple Silicon',
        winExeDesc: 'Windows 标准安装程序',
        winZipDesc: '便携版（无需安装）',
        btn: '下载'
      },
      docs: {
        back: '返回首页',
        title: '自定义宠物标准',
        desc: '将您的自定义宠物上传到 MiniPet 系统的文件结构指南。',
        section1: '文件夹结构',
        section1_desc: '一个完整的宠物必须在单个文件夹中包含 2 个必需的文件：',
        section2: '精灵图（9 行）',
        section2_desc: 'spritesheet.webp 图像必须分为 9 个固定行：',
        table: {
          row: '行',
          action: '动作',
          desc: '详细说明',
          idle: '保持静止并等待。',
          walkR: '向右走。',
          walkL: '向左走。',
          greet: '向用户打招呼。',
          action_spec: '特殊动作（吃文件、跳跃...）。',
          failed: '悲伤、失望或掉落。',
          waiting: '等待太久、睡觉或被捡起。',
          running: '快跑。',
          review: '用于预览功能。'
        },
        section3: '默认方向',
        section3_desc: '默认情况下，系统假定所有图像都朝向右侧。当宠物向左移动时，系统将自动翻转图像。',
        section3_note: '重要提示：如果您的角色默认朝向左侧，则必须在 pet.json 文件中添加 "facingRight": false。',
        section4: '真实示例：黑悟空',
        section4_desc: '供您参考的完整角色样本。',
        spritesheet_sample: '精灵图样本',
        scroll_note: '滚动查看所有 9 行 →',
        json_config: 'pet.json 配置'
      },
      footer: {
        disclaimer: '免责声明：',
        disclaimer_text: '此应用程序仅提供工具；我们不拥有也不对用户上传或从外部资源链接的内容/图像负责。',
        copyright: '开源项目。'
      }
    }
  },
  it: {
    translation: {
      seo: {
        title: 'MiniPet - I Tuoi Simpatici Amici Pixel per Desktop',
        description: 'MiniPet è un\'app desktop leggera che porta simpatici amici pixel nel tuo spazio di lavoro. Aumenta la produttività con Pomodoro e goditi i pet interattivi.',
        keywords: 'minipet, minipets, mini pet, mini pets, mini pet app, mini pet apps, virtual pet, helloquocbao, qbao, pet desktop, pixel pet, timer pomodoro, compagno desktop, pet virtuale, pet interattivo, minipet ufficiale'
      },
      nav: {
        features: 'Caratteristiche',
        docs: 'Pet Personalizzati',
        download: 'Scarica Gratis',
        market: 'Negozio',
        admin: 'Pannello Admin',
        profile: 'Profilo',
        mint_custom: 'Crea Pet Personalizzato',
        logout: 'Disconnetti',
        sync: 'Sincronizza / zkLogin',
        connect: 'Connetti wallet'
      },
      wallet: {
        modal_title: 'Connetti il tuo wallet',
        modal_subtitle: 'Scegli un metodo per collegare il tuo wallet con MiniPet'
      },
      hero: {
        title1: 'Incontra i tuoi',
        title2: 'nuovi amici',
        title3: 'di desktop.',
        desc: 'MiniPet è un\'app desktop leggera che porta simpatici amici pixel nel tuo spazio di lavoro. Camminano, parlano e "mangiano" persino i tuoi file indesiderati mentre lavori.',
        getFree: 'Ottieni MiniPet Gratis',
        source: 'Codice Sorgente',
        noAds: 'Senza Annunci',
        noAccount: 'Nessun Account',
        privacy: 'Privacy 100%'
      },
      features: {
        badge: 'Piccolo compagno, grande gioia',
        desc: 'Un compagno desktop semplice e delizioso progettato per mantenerti produttivo e sorridente durante il giorno.',
        companion: {
          title: 'Compagno Desktop Live',
          desc: 'Il tuo pet pixel vive proprio sul tuo schermo: cammina, parla e porta gioia in ogni sessione di lavoro.'
        },
        pomodoro: {
          title: 'Timer Pomodoro',
          desc: 'Cicli di lavoro/pausa personalizzabili con il tuo pet, che ti avvisa gentilmente quando è ora di riposare.'
        },
        multi: {
          title: 'Supporto Multi-Pet',
          desc: 'Perché accontentarsi di uno solo? Crea più pet con personalità uniche e guardali interagire tra loro.'
        },
        eating: {
          title: 'Sistema Mangia-File',
          desc: 'Un modo divertente e interattivo per pulire il tuo spazio di lavoro. Trascina i file indesiderati sul tuo pet e guardali sparire.'
        },
        custom: {
          title: 'PetDex e Pet Personalizzati',
          desc: 'Importa dalla nostra vasta libreria PetDex o carica la tua pixel art per creare un compagno davvero unico.'
        }
      },
      download: {
        title: 'Pronto a incontrare il tuo compagno?',
        desc: 'Scegli la tua piattaforma e inizia oggi il tuo viaggio con MiniPet. È gratis e lo sarà sempre.',
        macDesc: 'Supporta Intel e Apple Silicon',
        winExeDesc: 'Installatore standard per Windows',
        winZipDesc: 'Versione portatile (nessuna installazione)',
        btn: 'Scarica'
      },
      docs: {
        back: 'Torna alla Home',
        title: 'Standard Pet Personalizzati',
        desc: 'Guida sulla struttura dei file per caricare i tuoi pet personalizzati nel sistema MiniPet.',
        section1: 'Struttura della Cartella',
        section1_desc: 'Un pet completo deve includere 2 file obbligatori in una singola cartella:',
        section2: 'Spritesheet (9 Righe)',
        section2_desc: 'L\'immagine spritesheet.webp deve essere divisa in 9 righe fisse:',
        table: {
          row: 'Riga',
          action: 'Azione',
          desc: 'Descrizione Dettagliata',
          idle: 'Resta fermo e aspetta.',
          walkR: 'Cammina a destra.',
          walkL: 'Cammina a sinistra.',
          greet: 'Saluta l\'utente.',
          action_spec: 'Azione speciale (Mangia file, salta...).',
          failed: 'Triste, deluso o caduto.',
          waiting: 'Aspettando troppo a lungo, dormendo o venendo preso.',
          running: 'Corri veloce.',
          review: 'Per le funzioni di anteprima.'
        },
        section3: 'Direzione Predefinita',
        section3_desc: 'Per impostazione predefinita, il sistema assume che tutte le immagini siano rivolte a destra. Il sistema capovolgerà automaticamente l\'immagine quando il pet si muove a sinistra.',
        section3_note: 'Importante: se il tuo personaggio è rivolto a sinistra per impostazione predefinita, devi aggiungere "facingRight": false al tuo file pet.json.',
        section4: 'Esempio Reale: Black Wukong',
        section4_desc: 'Un campione di personaggio completo come riferimento.',
        spritesheet_sample: 'Campione Spritesheet',
        scroll_note: 'Scorri per vedere tutte le 9 righe →',
        json_config: 'Configurazione pet.json'
      },
      footer: {
        disclaimer: 'Dichiarazione di non responsabilità:',
        disclaimer_text: 'Questa applicazione fornisce solo strumenti; non siamo i proprietari e non siamo responsabili per i contenuti o le immagini caricate dagli utenti o collegate da fonti esterne.',
        copyright: 'Progetto Open Source.'
      }
    }
  },
  fr: {
    translation: {
      seo: {
        title: 'MiniPet - Vos Compagnons Pixel Adorables pour Bureau',
        description: 'MiniPet est une application de bureau légère qui apporte de mignons amis pixel à votre espace de travail. Boostez votre productivité với Pomodoro.',
        keywords: 'minipet, minipets, mini pet, mini pets, mini pet app, mini pet apps, virtual pet, helloquocbao, qbao, pet de bureau, pixel pet, minuteur pomodoro, compagnon de bureau, pet virtuel, pet interactif, minipet officiel'
      },
      nav: {
        features: 'Fonctionnalités',
        docs: 'Pets Personnalisés',
        download: 'Télécharger Gratuitement',
        market: 'Boutique',
        admin: 'Espace Admin',
        profile: 'Profil',
        mint_custom: 'Créer Pet',
        logout: 'Se Déconnecter',
        sync: 'Synchro / zkLogin',
        connect: 'Se Connecter'
      },
      wallet: {
        modal_title: 'Connectez votre portefeuille',
        modal_subtitle: 'Choisissez une méthode pour lier votre portefeuille avec MiniPet'
      },
      hero: {
        title1: 'Rencontrez vos',
        title2: 'nouveaux amis',
        title3: 'de bureau.',
        desc: 'MiniPet est une application de bureau légère qui apporte de mignons amis pixel à votre espace de travail. Ils marchent, parlent et "mangent" même vos fichiers indésirables pendant que vous travaillez.',
        getFree: 'Obtenir MiniPet Gratuitement',
        source: 'Code Source',
        noAds: 'Sans Pub',
        noAccount: 'Sans Compte',
        privacy: '100% Privé'
      },
      features: {
        badge: 'Petit compagnon, grande joie',
        desc: 'Un compagnon de bureau simple et charmant conçu pour vous garder productif et souriant tout au long de la journée.',
        companion: {
          title: 'Compagnon de Bureau en Direct',
          desc: 'Votre pet pixel vit directement sur votre écran — marchant, parlant et apportant de la joie à chaque session de travail.'
        },
        pomodoro: {
          title: 'Minuteur Pomodoro',
          desc: 'Cycles de travail/pause personnalisables avec votre pet — vous avertissant doucement quand il est temps de se reposer.'
        },
        multi: {
          title: 'Support Multi-Pet',
          desc: 'Pourquoi se contenter d\'un seul ? Créez plusieurs pets avec des personnalités uniques et regardez-les interagir les uns với les autres.'
        },
        eating: {
          title: 'Système Mangeur de Fichiers',
          desc: 'Une façon amusante et interactive de nettoyer votre espace de travail. Faites simplement glisser les fichiers indésirables sur votre pet et regardez-les disparaître.'
        },
        custom: {
          title: 'PetDex & Pets Personnalisés',
          desc: 'Importez à partir de notre immense bibliothèque PetDex ou téléchargez votre propre pixel art pour créer un compagnon vraiment unique.'
        }
      },
      download: {
        title: 'Prêt à rencontrer votre compagnon ?',
        desc: 'Choisissez votre plateforme et commencez votre voyage avec MiniPet aujourd\'hui. C\'est gratuit et le sera toujours.',
        macDesc: 'Support Intel et Apple Silicon',
        winExeDesc: 'Installateur standard pour Windows',
        winZipDesc: 'Version portable (sans installation)',
        btn: 'Télécharger'
      },
      docs: {
        back: 'Retour à l\'Accueil',
        title: 'Standard Pet Personnalisé',
        desc: 'Guide sur la structure des fichiers pour télécharger vos pets personnalisés dans le système MiniPet.',
        section1: 'Structure du Dossier',
        section1_desc: 'Un pet complet doit inclure 2 fichiers obligatoires dans un seul dossier :',
        section2: 'Spritesheet (9 Lignes)',
        section2_desc: 'L\'image spritesheet.webp doit être divisée en 9 lignes fixes :',
        table: {
          row: 'Ligne',
          action: 'Action',
          desc: 'Description Détaillée',
          idle: 'Reste immobile et attend.',
          walkR: 'Marche vers la droite.',
          walkL: 'Marche vers la gauche.',
          greet: 'Salue l\'utilisateur.',
          action_spec: 'Action spéciale (Mange un fichier, saute...).',
          failed: 'Triste, déçu ou tombé.',
          waiting: 'Attend trop longtemps, dort ou est ramassé.',
          running: 'Court vite.',
          review: 'Pour les fonctionnalités d\'aperçu.'
        },
        section3: 'Direction par Défaut',
        section3_desc: 'Par défaut, le système suppose que toutes les images sont tournées vers la droite. Le système retournera automatiquement l\'image khi le pet se déplace vers la gauche.',
        section3_note: 'Important : si votre personnage est tourné vers la gauche par défaut, vous devez ajouter "facingRight": false à votre fichier pet.json.',
        section4: 'Exemple Réel : Black Wukong',
        section4_desc: 'Un échantillon de personnage complet pour votre référence.',
        spritesheet_sample: 'Échantillon Spritesheet',
        scroll_note: 'Faites défiler pour voir les 9 lignes →',
        json_config: 'Configuration pet.json'
      },
      footer: {
        disclaimer: 'Clause de non-responsabilité :',
        disclaimer_text: 'Cette application ne fournit que des outils ; nous ne possédons pas et ne sommes pas responsables du contenu ou des images téléchargés par les utilisateurs ou liés à partir de sources externes.',
        copyright: 'Projet Open Source.'
      }
    }
  },
  ko: {
    translation: {
      seo: {
        title: 'MiniPet - 귀여운 데스크톱 픽셀 동반자',
        description: 'MiniPet은 작업 공간에 귀여운 픽셀 친구를 데려다주는 가벼운 데스크톱 앱입니다. 포모도로 타이머로 생산성을 높이고 대화형 데스크톱 펫을 즐겨보세요.',
        keywords: 'minipet, 미니펫, 데스크톱 펫, 픽셀 펫, 포모도로 타이머, 데스크톱 동반자, 가상 펫, 화면 펫, 미니펫 공식'
      },
      nav: {
        features: '기능',
        docs: '커스텀 펫',
        download: '무료 다운로드',
        market: '상점',
        admin: '관리자 센터',
        profile: '프로필',
        mint_custom: '커스텀 펫 만들기',
        logout: '로그아웃',
        sync: 'zkLogin / 지갑 동기화',
        connect: '지갑 연결'
      },
      wallet: {
        modal_title: '지갑 연결',
        modal_subtitle: 'MiniPet에 지갑을 연결할 방법을 선택하세요'
      },
      hero: {
        title1: '새로운',
        title2: '데스크톱',
        title3: '동반자를 만나보세요.',
        desc: 'MiniPet은 작업 공간에 귀여운 픽셀 친구를 데려다주는 가벼운 데스크톱 앱입니다. 일하는 동안 걸어 다니고, 말하고, 심지어 원치 않는 파일을 "먹기"도 합니다.',
        getFree: 'MiniPet 무료 다운로드',
        source: '소스 코드',
        noAds: '광고 없음',
        noAccount: '계정 필요 없음',
        privacy: '100% 개인정보 보호'
      },
      features: {
        badge: '작은 동반자, 큰 기쁨',
        desc: '하루 종일 생산성을 유지하고 미소를 짓게 하도록 설계된 간단하고 즐거운 데스크톱 동반자입니다.',
        companion: {
          title: '실시간 데스크톱 동반자',
          desc: '귀하의 픽셀 펫이 화면 위에 직접 살아서 걷고 말하며 모든 작업 세션에 기쁨을 가져다줍니다.'
        },
        pomodoro: {
          title: '포모도로 타이머',
          desc: '펫과 함께하는 맞춤형 작업/휴식 사이클 — 휴식 시간이 되면 펫이 부드럽게 넛지를 보내줍니다.'
        },
        multi: {
          title: '다중 펫 지원',
          desc: '왜 하나만 키우나요? 독특한 개성을 가진 여러 펫을 소환하고 서로 상호작용하는 모습을 지켜보세요.'
        },
        eating: {
          title: '파일 먹기 시스템',
          desc: '작업 공간을 청소하는 재미있고 인터랙티브한 방법입니다. 원하지 않는 파일을 펫에게 드래그하여 사라지는 것을 지켜보세요.'
        },
        custom: {
          title: 'PetDex 및 커스텀 펫',
          desc: '방대한 PetDex 라이브러리에서 가져오거나 나만의 픽셀 아트를 업로드하여 진정으로 독특한 동반자를 만드세요.'
        }
      },
      download: {
        title: '동반자를 만날 준비가 되셨나요?',
        desc: '플랫폼을 선택하고 오늘 MiniPet과 함께 여정을 시작하세요. 무료이며 앞으로도 계속 무료입니다.',
        macDesc: 'Intel 및 Apple Silicon 지원',
        winExeDesc: 'Windows용 표준 설치 프로그램',
        winZipDesc: '포터블 버전 (설치 불필요)',
        btn: '다운로드'
      },
      docs: {
        back: '홈으로 돌아가기',
        title: '규격 커스텀 펫',
        desc: 'MiniPet 시스템에 나만의 커스텀 펫을 업로드하기 위한 파일 구조 가이드입니다.',
        section1: '폴더 구조',
        section1_desc: '완전한 펫은 단일 폴더 내에 2개의 필수 파일을 포함해야 합니다:',
        section2: '스프라이트 시트 (9행)',
        section2_desc: 'spritesheet.webp 이미지는 고정된 9개의 행으로 나누어져야 합니다:',
        table: {
          row: '행',
          action: '동작',
          desc: '상세 설명',
          idle: '가만히 서서 기다립니다.',
          walkR: '오른쪽으로 걷습니다.',
          walkL: '왼쪽으로 걷습니다.',
          greet: '사용자에게 인사합니다.',
          action_spec: '특수 동작 (파일 먹기, 점프 등).',
          failed: '슬픔, 실망 또는 쓰러짐.',
          waiting: '너무 오래 대기하거나, 자거나, 들어 올려짐.',
          running: '빨리 달립니다.',
          review: '미리보기 기능용.'
        },
        section3: '기본 방향',
        section3_desc: '기본적으로 시스템은 모든 이미지가 오른쪽을 향하고 있다고 가정합니다. 펫이 왼쪽으로 이동할 때 시스템이 자동으로 이미지를 반전시킵니다.',
        section3_note: '중요: 캐릭터가 기본적으로 왼쪽을 향하고 있는 경우 pet.json 파일에 "facingRight": false를 추가해야 합니다.',
        section4: '실제 사례: 블랙 오공',
        section4_desc: '참고할 수 있는 완전한 캐릭터 샘플입니다.',
        spritesheet_sample: '스프라이트 시트 샘플',
        scroll_note: '9개의 행을 모두 보려면 스크롤하세요 →',
        json_config: 'pet.json 설정'
      },
      custom: {
        back: '돌아가기',
        title: '커스텀 펫 민팅',
        subtitle: '나만의 독특한 탈중앙화 펫 만들기',
        no_slot: {
          title: '민트 슬롯을 찾을 수 없음',
          desc: '먼저 마켓에서 민트 슬롯을 구매해야 합니다.',
          go_market: '마켓으로 이동'
        },
        form: {
          name_label: '펫 이름',
          name_placeholder: '예: 사이버 키티',
          avatar_label: '아바타 이미지',
          sprite_label: '애니메이션 스프라이트 시트',
          upload_hint: '파일 선택',
          uploaded_hint: 'Walrus에 업로드됨',
          sponsor_badge: '관리자 지원',
          sponsor_desc: '업로드 비용이 지원됩니다! 귀하의 펫은 Walrus에 영구적으로 저장됩니다.',
          mint_btn: '커스텀 펫 민팅'
        },
        alerts: {
          mint_success: '커스텀 펫이 민팅되었습니다! 관리자가 가스비를 지원했습니다 ✨',
          upload_failed: 'Walrus 업로드에 실패했습니다. 다시 시도해 주세요.',
          sponsor_unavailable: '현재 관리자 가스비 지원을 사용할 수 없습니다.',
          mint_failed: '커스텀 펫 민팅에 실패했습니다: {{error}}'
        },
        preview: {
          title: '실시간 애니메이션 미리보기',
          desc: '블록체인에 민팅하기 전에 펫 애니메이션을 테스트해 보세요.',
          no_sprite: '업로드된 스프라이트 시트 없음',
          frames_per_row: '한 행당 프레임 수',
          guidelines_title: '스프라이트 시트 가이드라인',
          guide_1: '스프라이트 시트 이미지는 각 캐릭터 상태에 대해 정확히 9행의 프레임을 포함해야 합니다.',
          guide_2: '모든 행은 동일한 수의 프레임(열)을 가져야 합니다. 기본값은 4열입니다.',
          guide_3: '올바른 애니메이션 정렬을 위해 캐릭터는 기본적으로 오른쪽을 향해야 합니다.',
          view_docs: '전체 문서 보기'
        }
      },
      admin: {
        title: '관리자 센터',
        subtitle: 'MiniPet 에코시스템 관리',
        tabs: {
          overview: '개요',
          store: '상점',
          economy: '경제',
          system: '시스템'
        },
        dashboard: {
          package_id: '패키지 ID',
          mipet_token: 'MIPET 토큰',
          status: '관리자 상태',
          authorized: '인증됨',
          custom_mint_progress: '민팅된 커스텀 펫 수',
          slot_price: '커스텀 슬롯 가격',
          slot_price_desc: '사용자가 커스텀 민팅하는 데 필요한 수수료',
          treasury_addr: '금고 수신 주소',
          treasury_desc: '모든 슬롯 구매 수수료를 받습니다',
          welcome: '관리자님, 환영합니다',
          welcome_desc: '위의 탐색 메뉴를 사용하여 펫 상점을 관리하고, MIPET 토큰을 발행하거나, 수수료 및 한도와 같은 글로벌 시스템 매개변수를 조정하십시오.'
        },
        store: {
          add_title: '새 펫 템플릿 추가',
          pet_name: '펫 이름',
          price: '가격 (SUI)',
          main_image: '메인 이미지 (PNG)',
          sprite_sheet: '스프라이트 시트 (PNG)',
          uploading: '업로드 중...',
          uploaded: '업로드 완료',
          choose_file: '파일 선택',
          confirm_btn: '확인 및 상점에 추가'
        },
        economy: {
          mint_title: 'MIPET 토큰 발행 (Mint)',
          recipient: '수신자 주소',
          amount: '수량 (MIPET)',
          mint_btn: '발행',
          treasury_title: '금고 관리',
          new_treasury: '새 금고 주소',
          update_btn: '업데이트',
          treasury_note: '참고: 이 주소는 상점 구매 및 커스텀 슬롯 판매로 발생하는 모든 수수료를 받게 됩니다.'
        },
        system: {
          title: '시스템 설정',
          fee_label: '기본 커스텀 슬롯 수수료 (MIPET)',
          save_btn: '변경 사항 저장',
          limit_label: '커스텀 펫 민팅 한도 늘리기',
          increase_btn: '한도 늘리기',
          limit_desc: '현재 활성화된 한도: {{current}}마리의 커스텀 펫.',
          warning: '경고',
          warning_desc: '이 매개변수를 조정하면 전체 경제에 영향을 미칩니다. 변경 사항은 블록체인에 즉시 반영됩니다.'
        },
        alerts: {
          template_success: '템플릿이 성공적으로 생성되었습니다!',
          tokens_minted: '토큰이 발행되었습니다!',
          treasury_updated: '금고가 업데이트되었습니다!',
          config_updated: '설정이 업데이트되었습니다!',
          upload_failed: 'Walrus 업로드에 실패했습니다.',
          limit_increased: '커스텀 펫 민팅 한도가 성공적으로 증가했습니다!'
        }
      },
      market: {
        nav_badge: '공식 상점',
        title: '동반자 입양하기',
        desc: '공식 픽셀 펫 컬렉션에서 선택해 보세요. 각 펫은 Sui 블록체인의 고유한 NFT입니다.',
        custom_slot: {
          title: '커스텀 펫 슬롯',
          desc: '나만의 픽셀 친구 디자인하기'
        },
        pet_card: {
          loyal_companion: '{{energy}}를 가진 충실한 동반자. 작업 공간을 밝힐 준비가 되어 있습니다!',
          mythical_powers: '신비로운 능력',
          fluffy_energy: '솜털 같은 에너지',
          adopt_btn: '지금 입양하기'
        },
        mint_section: {
          title: '완벽한 펫을 찾지 못하셨나요?',
          desc: '민트 슬롯을 구매하고 나만의 스프라이트 시트를 업로드하여 나만이 소유한 단 하나의 동반자를 만들어 보세요.',
          buy_btn: '민트 슬롯 구매',
          view_guide: '가이드 보기'
        },
        alerts: {
          need_mipet: '민트 슬롯을 구매하려면 MIPET 토큰이 필요합니다!',
          buy_pet_success: '펫을 성공적으로 입양했습니다! 데스크톱 앱 또는 프로필을 확인해 주세요.',
          buy_slot_success: '민트 슬롯을 성공적으로 구매했습니다! 생성 페이지로 이동 중...',
          buy_custom_slot_success: '민트 슬롯을 성공적으로 구매했습니다! 펫 커스터마이징 페이지로 이동 중...',
          has_slot: '이미 민트 슬롯을 보유하고 있습니다! 제작 페이지로 이동 중...',
          has_slot_custom: '이미 민트 슬롯을 보유하고 있습니다! 이 펫 정보가 입력된 제작 페이지로 이동 중...',
          buy_failed: '거래가 실패했거나 거부되었습니다: {{error}}'
        }
      },
      not_found: {
        title: '페이지를 찾을 수 없음',
        desc: '죄송합니다! 찾고 계신 펫이 디지털 야생 속으로 가버렸습니다.',
        back_home: '홈으로 돌아가기'
      },
      footer: {
        disclaimer: '면책 조항:',
        disclaimer_text: '이 애플리케이션은 도구만 제공합니다. 당사는 사용자가 업로드하거나 외부 리소스에서 링크한 콘텐츠/이미지를 소유하지 않으며 이에 대해 책임을 지지 않습니다.',
        copyright: '오픈 소스 프로젝트.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
