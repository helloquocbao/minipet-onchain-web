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
        download: 'Download Free'
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
          need_mipet: 'You need MIPET tokens to buy a mint slot!'
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
          sponsor_unavailable: 'Admin sponsorship is currently unavailable.'
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
          welcome: 'Welcome back, Admin',
          welcome_desc: 'Use the navigation above to manage the Pet Store, mint MIPET tokens, or adjust global system parameters like fees and limits.'
        },
        store: {
          add_title: 'Add New Pet Template',
          pet_name: 'Pet Name',
          price: 'Price (MIPET)',
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
          warning: 'Warning',
          warning_desc: 'Adjusting these parameters affects the entire economy. Changes are immediate on the blockchain.'
        },
        alerts: {
          template_success: 'Template created successfully!',
          tokens_minted: 'Tokens minted!',
          treasury_updated: 'Treasury updated!',
          config_updated: 'Config updated!',
          upload_failed: 'Failed to upload to Walrus.'
        }
      },
      not_found: {
        title: 'Page Not Found',
        desc: 'Oops! The pet you\'re looking for has wandered off into the digital wilderness.',
        back_home: 'Return Home'
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
        logout: 'Đăng xuất'
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
          need_mipet: 'Bạn cần token MIPET để mua ô đúc!'
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
          sponsor_unavailable: 'Dịch vụ tài trợ của Admin hiện không khả dụng.'
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
          welcome: 'Chào mừng trở lại, Admin',
          welcome_desc: 'Sử dụng thanh điều hướng phía trên để quản lý Cửa hàng, đúc token MIPET hoặc điều chỉnh các thông số hệ thống toàn cầu như phí và giới hạn.'
        },
        store: {
          add_title: 'Thêm mẫu Pet mới',
          pet_name: 'Tên thú cưng',
          price: 'Giá (MIPET)',
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
          warning: 'Cảnh báo',
          warning_desc: 'Việc điều chỉnh các thông số này ảnh hưởng đến toàn bộ nền kinh tế. Các thay đổi có hiệu lực ngay lập tức trên blockchain.'
        },
        alerts: {
          template_success: 'Đã tạo mẫu thành công!',
          tokens_minted: 'Đã đúc token thành công!',
          treasury_updated: 'Đã cập nhật kho bạc!',
          config_updated: 'Đã cập nhật cấu hình!',
          upload_failed: 'Tải lên Walrus thất bại.'
        }
      },
      not_found: {
        title: 'Không tìm thấy trang',
        desc: 'Rất tiếc! Thú cưng bạn đang tìm kiếm đã đi lạc vào vùng đất hoang kỹ thuật số.',
        back_home: 'Quay lại Trang chủ'
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
        download: '免费下载'
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
        download: 'Scarica Gratis'
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
        download: 'Télécharger Gratuitement'
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
