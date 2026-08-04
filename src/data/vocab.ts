import type { VocabWord } from '../types'

interface Topic {
  topic: string
  words: VocabWord[]
}

export const VOCAB: Topic[] = [
  {
    topic: '人物关系',
    words: [
      { korean: '가족', romanization: 'gajok', chinese: '家人', level: '1', topic: '人物关系' },
      { korean: '아버지', romanization: 'abeoji', chinese: '爸爸', level: '1', topic: '人物关系' },
      { korean: '어머니', romanization: 'eomeoni', chinese: '妈妈', level: '1', topic: '人物关系' },
      { korean: '할아버지', romanization: 'harabeoji', chinese: '爷爷', level: '1', topic: '人物关系' },
      { korean: '친구', romanization: 'chingu', chinese: '朋友', level: '1', topic: '人物关系' },
      { korean: '동생', romanization: 'dongsaeng', chinese: '弟/妹', level: '1', topic: '人物关系' },
      { korean: '선생님', romanization: 'seonsaengnim', chinese: '老师', level: '1', topic: '人物关系' },
      { korean: '이웃', romanization: 'iut', chinese: '邻居', level: '2', topic: '人物关系' },
    ],
  },
  {
    topic: '身体部位',
    words: [
      { korean: '머리', romanization: 'meori', chinese: '头', level: '1', topic: '身体部位' },
      { korean: '눈', romanization: 'nun', chinese: '眼睛', level: '1', topic: '身体部位' },
      { korean: '손', romanization: 'son', chinese: '手', level: '1', topic: '身体部位' },
      { korean: '발', romanization: 'bal', chinese: '脚', level: '1', topic: '身体部位' },
      { korean: '배', romanization: 'bae', chinese: '肚子', level: '1', topic: '身体部位' },
      { korean: '입', romanization: 'ip', chinese: '嘴', level: '1', topic: '身体部位' },
      { korean: '귀', romanization: 'gwi', chinese: '耳朵', level: '1', topic: '身体部位' },
      { korean: '심장', romanization: 'simjang', chinese: '心脏', level: '3', topic: '身体部位' },
    ],
  },
  {
    topic: '食物饮料',
    words: [
      { korean: '밥', romanization: 'bap', chinese: '饭', level: '1', topic: '食物饮料' },
      { korean: '국', romanization: 'guk', chinese: '汤', level: '1', topic: '食物饮料' },
      { korean: '김치', romanization: 'kimchi', chinese: '泡菜', level: '1', topic: '食物饮料' },
      { korean: '물', romanization: 'mul', chinese: '水', level: '1', topic: '食物饮料' },
      { korean: '커피', romanization: 'keopi', chinese: '咖啡', level: '1', topic: '食物饮料' },
      { korean: '우유', romanization: 'uyu', chinese: '牛奶', level: '1', topic: '食物饮料' },
      { korean: '빵', romanization: 'ppang', chinese: '面包', level: '1', topic: '食物饮料' },
      { korean: '라면', romanization: 'ramyeon', chinese: '拉面', level: '1', topic: '食物饮料' },
    ],
  },
  {
    topic: '水果蔬菜',
    words: [
      { korean: '사과', romanization: 'sagwa', chinese: '苹果', level: '1', topic: '水果蔬菜' },
      { korean: '바나나', romanization: 'banana', chinese: '香蕉', level: '1', topic: '水果蔬菜' },
      { korean: '포도', romanization: 'podo', chinese: '葡萄', level: '1', topic: '水果蔬菜' },
      { korean: '토마토', romanization: 'tomato', chinese: '番茄', level: '1', topic: '水果蔬菜' },
      { korean: '감자', romanization: 'gamja', chinese: '土豆', level: '1', topic: '水果蔬菜' },
      { korean: '배추', romanization: 'baechu', chinese: '白菜', level: '2', topic: '水果蔬菜' },
    ],
  },
  {
    topic: '餐厅点餐',
    words: [
      { korean: '주문', romanization: 'jumun', chinese: '点餐', level: '2', topic: '餐厅点餐' },
      { korean: '메뉴', romanization: 'menyu', chinese: '菜单', level: '1', topic: '餐厅点餐' },
      { korean: '계산서', romanization: 'gyesanseo', chinese: '账单', level: '2', topic: '餐厅点餐' },
      { korean: '맛있게', romanization: 'masitge', chinese: '好吃地', level: '1', topic: '餐厅点餐' },
      { korean: '필요', romanization: 'piryo', chinese: '需要', level: '1', topic: '餐厅点餐' },
      { korean: '추천', romanization: 'chucheon', chinese: '推荐', level: '2', topic: '餐厅点餐' },
    ],
  },
  {
    topic: '购物消费',
    words: [
      { korean: '쇼핑', romanization: 'syoping', chinese: '购物', level: '1', topic: '购物消费' },
      { korean: '가격', romanization: 'gagyeok', chinese: '价格', level: '2', topic: '购物消费' },
      { korean: '할인', romanization: 'harin', chinese: '打折', level: '2', topic: '购物消费' },
      { korean: '카드', romanization: 'kadeu', chinese: '卡', level: '1', topic: '购物消费' },
      { korean: '현금', romanization: 'hyeongeum', chinese: '现金', level: '2', topic: '购物消费' },
      { korean: '영수증', romanization: 'yeongsujeung', chinese: '收据', level: '3', topic: '购物消费' },
    ],
  },
  {
    topic: '交通出行',
    words: [
      { korean: '버스', romanization: 'beoseu', chinese: '公交', level: '1', topic: '交通出行' },
      { korean: '지하철', romanization: 'jihacheol', chinese: '地铁', level: '1', topic: '交通出行' },
      { korean: '택시', romanization: 'taeksi', chinese: '出租车', level: '1', topic: '交通出行' },
      { korean: '기차', romanization: 'gicha', chinese: '火车', level: '1', topic: '交通出行' },
      { korean: '공항', romanization: 'gonghang', chinese: '机场', level: '2', topic: '交通出行' },
      { korean: '길', romanization: 'gil', chinese: '路', level: '1', topic: '交通出行' },
    ],
  },
  {
    topic: '时间日期',
    words: [
      { korean: '오늘', romanization: 'oneul', chinese: '今天', level: '1', topic: '时间日期' },
      { korean: '내일', romanization: 'naeil', chinese: '明天', level: '1', topic: '时间日期' },
      { korean: '어제', romanization: 'eoje', chinese: '昨天', level: '1', topic: '时间日期' },
      { korean: '시간', romanization: 'sigan', chinese: '时间', level: '1', topic: '时间日期' },
      { korean: '주말', romanization: 'jumal', chinese: '周末', level: '1', topic: '时间日期' },
      { korean: '분', romanization: 'bun', chinese: '分钟', level: '1', topic: '时间日期' },
    ],
  },
  {
    topic: '天气季节',
    words: [
      { korean: '날씨', romanization: 'nalssi', chinese: '天气', level: '1', topic: '天气季节' },
      { korean: '비', romanization: 'bi', chinese: '雨', level: '1', topic: '天气季节' },
      { korean: '눈', romanization: 'nun', chinese: '雪', level: '1', topic: '天气季节' },
      { korean: '봄', romanization: 'bom', chinese: '春', level: '1', topic: '天气季节' },
      { korean: '여름', romanization: 'yeoreum', chinese: '夏', level: '1', topic: '天气季节' },
      { korean: '겨울', romanization: 'gyeoul', chinese: '冬', level: '1', topic: '天气季节' },
    ],
  },
  {
    topic: '颜色形状',
    words: [
      { korean: '빨간색', romanization: 'ppalgansaek', chinese: '红色', level: '1', topic: '颜色形状' },
      { korean: '파란색', romanization: 'paransaek', chinese: '蓝色', level: '1', topic: '颜色形状' },
      { korean: '노란색', romanization: 'noransaek', chinese: '黄色', level: '1', topic: '颜色形状' },
      { korean: '하얀색', romanization: 'hayansek', chinese: '白色', level: '1', topic: '颜色形状' },
      { korean: '동그라미', romanization: 'dong geurami', chinese: '圆形', level: '2', topic: '颜色形状' },
      { korean: '네모', romanization: 'nemo', chinese: '方形', level: '2', topic: '颜色形状' },
    ],
  },
  {
    topic: '学校学习',
    words: [
      { korean: '학교', romanization: 'hakgyo', chinese: '学校', level: '1', topic: '学校学习' },
      { korean: '공부', romanization: 'gongbu', chinese: '学习', level: '1', topic: '学校学习' },
      { korean: '시험', romanization: 'siheom', chinese: '考试', level: '1', topic: '学校学习' },
      { korean: '숙제', romanization: 'sukje', chinese: '作业', level: '1', topic: '学校学习' },
      { korean: '도서관', romanization: 'doseogwan', chinese: '图书馆', level: '2', topic: '学校学习' },
      { korean: '연습', romanization: 'yeonseup', chinese: '练习', level: '1', topic: '学校学习' },
    ],
  },
  {
    topic: '职场办公',
    words: [
      { korean: '회사', romanization: 'hoesa', chinese: '公司', level: '1', topic: '职场办公' },
      { korean: '회의', romanization: 'hoei', chinese: '会议', level: '2', topic: '职场办公' },
      { korean: '일', romanization: 'il', chinese: '工作', level: '1', topic: '职场办公' },
      { korean: '상사', romanization: 'sangsa', chinese: '上司', level: '3', topic: '职场办公' },
      { korean: '동료', romanization: 'dongnyo', chinese: '同事', level: '3', topic: '职场办公' },
      { korean: '프로젝트', romanization: 'peurojekteu', chinese: '项目', level: '3', topic: '职场办公' },
    ],
  },
  {
    topic: '医院就诊',
    words: [
      { korean: '병원', romanization: 'byeongwon', chinese: '医院', level: '1', topic: '医院就诊' },
      { korean: '약', romanization: 'yak', chinese: '药', level: '1', topic: '医院就诊' },
      { korean: '아프다', romanization: 'apeuda', chinese: '疼', level: '1', topic: '医院就诊' },
      { korean: '의사', romanization: 'uisa', chinese: '医生', level: '2', topic: '医院就诊' },
      { korean: '예약', romanization: 'yeyak', chinese: '预约', level: '2', topic: '医院就诊' },
      { korean: '치료', romanization: 'chiryo', chinese: '治疗', level: '3', topic: '医院就诊' },
    ],
  },
  {
    topic: '旅游出行',
    words: [
      { korean: '여행', romanization: 'yeohaeng', chinese: '旅行', level: '1', topic: '旅游出行' },
      { korean: '호텔', romanization: 'hotel', chinese: '酒店', level: '1', topic: '旅游出行' },
      { korean: '관광', romanization: 'gwangwang', chinese: '观光', level: '2', topic: '旅游出行' },
      { korean: '지도', romanization: 'jido', chinese: '地图', level: '2', topic: '旅游出行' },
      { korean: '기념품', romanization: 'ginyeompum', chinese: '纪念品', level: '3', topic: '旅游出行' },
      { korean: '여권', romanization: 'yeogwon', chinese: '护照', level: '2', topic: '旅游出行' },
    ],
  },
  {
    topic: '情感表达',
    words: [
      { korean: '기쁘다', romanization: 'gippeuda', chinese: '高兴', level: '1', topic: '情感表达' },
      { korean: '슬프다', romanization: 'seulpeuda', chinese: '悲伤', level: '2', topic: '情感表达' },
      { korean: '화나다', romanization: 'hwanada', chinese: '生气', level: '2', topic: '情感表达' },
      { korean: '사랑', romanization: 'sarang', chinese: '爱', level: '1', topic: '情感表达' },
      { korean: '미안', romanization: 'mian', chinese: '抱歉', level: '1', topic: '情感表达' },
      { korean: '감사', romanization: 'gamsa', chinese: '感谢', level: '1', topic: '情感表达' },
    ],
  },
  {
    topic: '兴趣爱好',
    words: [
      { korean: '취미', romanization: 'chwimi', chinese: '爱好', level: '1', topic: '兴趣爱好' },
      { korean: '음악', romanization: 'eumak', chinese: '音乐', level: '1', topic: '兴趣爱好' },
      { korean: '운동', romanization: 'undong', chinese: '运动', level: '1', topic: '兴趣爱好' },
      { korean: '영화', romanization: 'yeonghwa', chinese: '电影', level: '1', topic: '兴趣爱好' },
      { korean: '독서', romanization: 'dokseo', chinese: '读书', level: '2', topic: '兴趣爱好' },
      { korean: '그림', romanization: 'geurim', chinese: '画', level: '1', topic: '兴趣爱好' },
    ],
  },
  {
    topic: '家居用品',
    words: [
      { korean: '침대', romanization: 'chimdae', chinese: '床', level: '1', topic: '家居用品' },
      { korean: '소파', romanization: 'sopa', chinese: '沙发', level: '1', topic: '家居用品' },
      { korean: '책상', romanization: 'chaeksang', chinese: '书桌', level: '1', topic: '家居用品' },
      { korean: '냉장고', romanization: 'naengjanggo', chinese: '冰箱', level: '1', topic: '家居用品' },
      { korean: '창문', romanization: 'changmun', chinese: '窗户', level: '2', topic: '家居用品' },
      { korean: '거울', romanization: 'geoul', chinese: '镜子', level: '2', topic: '家居用品' },
    ],
  },
  {
    topic: '电子产品',
    words: [
      { korean: '핸드폰', romanization: 'haendeupon', chinese: '手机', level: '1', topic: '电子产品' },
      { korean: '컴퓨터', romanization: 'keompyuteo', chinese: '电脑', level: '1', topic: '电子产品' },
      { korean: '이어폰', romanization: 'ieophon', chinese: '耳机', level: '2', topic: '电子产品' },
      { korean: '충전기', romanization: 'chungjeongi', chinese: '充电器', level: '2', topic: '电子产品' },
      { korean: '카메라', romanization: 'kamera', chinese: '相机', level: '2', topic: '电子产品' },
      { korean: '배터리', romanization: 'baeteori', chinese: '电池', level: '3', topic: '电子产品' },
    ],
  },
  {
    topic: '动物植物',
    words: [
      { korean: '강아지', romanization: 'gangaji', chinese: '小狗', level: '1', topic: '动物植物' },
      { korean: '고양이', romanization: 'goyangi', chinese: '猫', level: '1', topic: '动物植物' },
      { korean: '꽃', romanization: 'kkot', chinese: '花', level: '1', topic: '动物植物' },
      { korean: '나무', romanization: 'namu', chinese: '树', level: '1', topic: '动物植物' },
      { korean: '새', romanization: 'sae', chinese: '鸟', level: '1', topic: '动物植物' },
      { korean: '물고기', romanization: 'mulgogi', chinese: '鱼', level: '2', topic: '动物植物' },
    ],
  },
  {
    topic: '数字度量',
    words: [
      { korean: '하나', romanization: 'hana', chinese: '一', level: '1', topic: '数字度量' },
      { korean: '둘', romanization: 'dul', chinese: '二', level: '1', topic: '数字度量' },
      { korean: '셋', romanization: 'set', chinese: '三', level: '1', topic: '数字度量' },
      { korean: '열', romanization: 'yeol', chinese: '十', level: '1', topic: '数字度量' },
      { korean: '백', romanization: 'baek', chinese: '百', level: '2', topic: '数字度量' },
      { korean: '퍼센트', romanization: 'peosenteu', chinese: '百分比', level: '3', topic: '数字度量' },
    ],
  },
  {
    topic: '衣物鞋帽',
    words: [
      { korean: '옷', romanization: 'ot', chinese: '衣服', level: '1', topic: '衣物鞋帽' },
      { korean: '모자', romanization: 'moja', chinese: '帽子', level: '1', topic: '衣物鞋帽' },
      { korean: '신발', romanization: 'sinbal', chinese: '鞋', level: '1', topic: '衣物鞋帽' },
      { korean: '바지', romanization: 'baji', chinese: '裤子', level: '1', topic: '衣物鞋帽' },
      { korean: '코트', romanization: 'koteu', chinese: '大衣', level: '2', topic: '衣物鞋帽' },
      { korean: '양말', romanization: 'yangmal', chinese: '袜子', level: '1', topic: '衣物鞋帽' },
    ],
  },
  {
    topic: '运动健身',
    words: [
      { korean: '축구', romanization: 'chukgu', chinese: '足球', level: '1', topic: '运动健身' },
      { korean: '수영', romanization: 'suyeong', chinese: '游泳', level: '1', topic: '运动健身' },
      { korean: '헬스', romanization: 'helseu', chinese: '健身', level: '2', topic: '运动健身' },
      { korean: '요가', romanization: 'yoga', chinese: '瑜伽', level: '2', topic: '运动健身' },
      { korean: '달리기', romanization: 'dalligi', chinese: '跑步', level: '2', topic: '运动健身' },
      { korean: '경기', romanization: 'gyeonggi', chinese: '比赛', level: '3', topic: '运动健身' },
    ],
  },
  {
    topic: '美妆护肤',
    words: [
      { korean: '화장품', romanization: 'hwajangpum', chinese: '化妆品', level: '2', topic: '美妆护肤' },
      { korean: '크림', romanization: 'keurim', chinese: '面霜', level: '2', topic: '美妆护肤' },
      { korean: '향수', romanization: 'hyangsu', chinese: '香水', level: '3', topic: '美妆护肤' },
      { korean: '피부', romanization: 'pibu', chinese: '皮肤', level: '3', topic: '美妆护肤' },
      { korean: '로션', romanization: 'rosyeon', chinese: '乳液', level: '2', topic: '美妆护肤' },
    ],
  },
  {
    topic: '韩流娱乐',
    words: [
      { korean: '아이돌', romanization: 'aidol', chinese: '偶像', level: '2', topic: '韩流娱乐' },
      { korean: '콘서트', romanization: 'konseoteu', chinese: '演唱会', level: '2', topic: '韩流娱乐' },
      { korean: '드라마', romanization: 'deurama', chinese: '电视剧', level: '1', topic: '韩流娱乐' },
      { korean: '노래', romanization: 'norae', chinese: '歌', level: '1', topic: '韩流娱乐' },
      { korean: '팬', romanization: 'paen', chinese: '粉丝', level: '2', topic: '韩流娱乐' },
      { korean: '무대', romanization: 'mudae', chinese: '舞台', level: '3', topic: '韩流娱乐' },
    ],
  },
  {
    topic: '节日庆典',
    words: [
      { korean: '설날', romanization: 'seollal', chinese: '春节', level: '2', topic: '节日庆典' },
      { korean: '추석', romanization: 'chuseok', chinese: '中秋', level: '2', topic: '节日庆典' },
      { korean: '생일', romanization: 'saengil', chinese: '生日', level: '1', topic: '节日庆典' },
      { korean: '선물', romanization: 'seonmul', chinese: '礼物', level: '1', topic: '节日庆典' },
      { korean: '파티', romanization: 'pati', chinese: '派对', level: '2', topic: '节日庆典' },
    ],
  },
  {
    topic: '公共场所',
    words: [
      { korean: '은행', romanization: 'eunhaeng', chinese: '银行', level: '2', topic: '公共场所' },
      { korean: '우체국', romanization: 'ucheguk', chinese: '邮局', level: '2', topic: '公共场所' },
      { korean: '공원', romanization: 'gongwon', chinese: '公园', level: '1', topic: '公共场所' },
      { korean: '시장', romanization: 'sijang', chinese: '市场', level: '1', topic: '公共场所' },
      { korean: '경찰서', romanization: 'gyeongchalseo', chinese: '警察局', level: '3', topic: '公共场所' },
    ],
  },
  {
    topic: '方位方向',
    words: [
      { korean: '앞', romanization: 'ap', chinese: '前', level: '1', topic: '方位方向' },
      { korean: '뒤', romanization: 'dwi', chinese: '后', level: '1', topic: '方位方向' },
      { korean: '왼쪽', romanization: 'oenjjok', chinese: '左', level: '1', topic: '方位方向' },
      { korean: '오른쪽', romanization: 'oreunjjok', chinese: '右', level: '1', topic: '方位方向' },
      { korean: '위', romanization: 'wi', chinese: '上', level: '1', topic: '方位方向' },
      { korean: '아래', romanization: 'arae', chinese: '下', level: '1', topic: '方位方向' },
    ],
  },
  {
    topic: '厨房用品',
    words: [
      { korean: '냄비', romanization: 'naembi', chinese: '锅', level: '2', topic: '厨房用品' },
      { korean: '접시', romanization: 'jeopsi', chinese: '盘子', level: '2', topic: '厨房用品' },
      { korean: '숟가락', romanization: 'sutgarak', chinese: '勺子', level: '1', topic: '厨房用品' },
      { korean: '젓가락', romanization: 'jeotgarak', chinese: '筷子', level: '1', topic: '厨房用品' },
      { korean: '칼', romanization: 'kal', chinese: '刀', level: '2', topic: '厨房用品' },
    ],
  },
  {
    topic: '银行邮局',
    words: [
      { korean: '계좌', romanization: 'gyejwa', chinese: '账户', level: '3', topic: '银行邮局' },
      { korean: '송금', romanization: 'songgeum', chinese: '汇款', level: '3', topic: '银行邮局' },
      { korean: '우표', romanization: 'upyo', chinese: '邮票', level: '2', topic: '银行邮局' },
      { korean: '소포', romanization: 'sopo', chinese: '包裹', level: '3', topic: '银行邮局' },
    ],
  },
  {
    topic: '宠物店',
    words: [
      { korean: '간식', romanization: 'gansik', chinese: '零食', level: '1', topic: '宠物店' },
      { korean: '목욕', romanization: 'mogyok', chinese: '洗澡', level: '2', topic: '宠物店' },
      { korean: '병원', romanization: 'byeongwon', chinese: '医院', level: '1', topic: '宠物店' },
    ],
  },
  {
    topic: '便利店',
    words: [
      { korean: '편의점', romanization: 'pyeonuijeom', chinese: '便利店', level: '2', topic: '便利店' },
      { korean: '담배', romanization: 'dambae', chinese: '烟', level: '3', topic: '便利店' },
      { korean: '음료수', romanization: 'eumnyosu', chinese: '饮料', level: '1', topic: '便利店' },
    ],
  },
]
