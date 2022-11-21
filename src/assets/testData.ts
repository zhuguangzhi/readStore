// TODO：测试数据 对接后删除
import {
  bookProps,
  bookRankProps,
  commentProps,
  worksProps,
} from '@/type/book';

export const testBookData: readonly bookProps[] = [
  {
    id: 1,
    title: '赶尸列车',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
    tags: ['新书'],
  },
  {
    id: 2,
    title: '零基础学画漫画4：素描技法练习本',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/eecae1e3/group6/M00/6C/9B/CmQUNlauC5uETavmAAAAANzPruo172792771.jpg?v=Qr4Ki2iQ',
    description:
      '在学习漫画的过程中，最开始的描红练习和临摹练习非常重要。对初次学习漫画绘画的朋友来说，描红无疑是练习用笔和画线的手段。在描红的过程中，读者不仅可以学习到基本线条的练习，还可以掌握漫画人物设定的各种方法，包括头部、表情、发型、身体结构、动态姿势、服装等，针对漫迷关心的重点题材和重点技术进行练习，让读者在动手过程中快速掌握绘画要点。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: true,
    progress: 8,
  },
  {
    id: 3,
    title: '智慧工厂：中国制造业探索实践',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/6f6fc16a/group6/M00/15/D5/CmQUOVavMZuEY8QUAAAAAEy3LJE213673347.jpg?v=yeSJG_Ev&t=CmQUOVqg2vQ.',
    description:
      '本书在编撰过程中，得到了一些著名专家的悉心指导和帮助。美国辛辛那提大学预测性维护中心的李杰教授、上海科技情报所缪其浩老师均多次参加编委会会议，提供了许多真知灼见。李杰教授还提供了若干有关工业4.0和工业大数据的文章作为参考。针对本书的编撰，我也曾当面请教原教育部副部长吴启迪教授，获得了她的热情鼓励和肯定。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 100,
  },
  {
    id: 4,
    title: '全球风口：积木式创新与中国新机遇',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/76bc22fc/group6/M00/6C/A7/CmQUN1avME-ERuNIAAAAAPDdXck985411589.jpg?v=fhHD3ozQ&t=CmQUN1lQzJI.',
    description:
      '互联网趋势专家王煜全在投资美国高新技术创业企业的过程中，对美国的高新技术创新机制进行了深入的观察和思考，在逐步形成自己的投资模式的过程中，他发现积木式创新成为美国高新技术创业企业的基本模式，由此带来的以企业家为核心的创业系统，不仅颠覆了传统跨国公司的封闭体制，也在很大程度上改变了传统资本主义社会的很多弊端，激发了整个社会的创新活力。 北京大学国家发展研究院教授薛兆丰在海外实地考察和与王煜全的交流沟通中，也感受到积木式创新所带来的深刻变化。他从学术的角度梳理了积木式创新的法律基础，分析了中国企业如何才能在这一波全球创新产业新浪潮中抓住机会，实现企业自身跨越式发展的同时，带动中国经济走上新的台阶。 两位作者，一位是有着丰富经验的风险投资人，跟读者分享他独特的投资经验；一位是北京大学国家发展研究院教授，从数据和学理出发，条分缕析地与读者一起研究积木式创新给中国带来的种种机会。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
  {
    id: 5,
    title: '如何培养逻辑脑：聪明人都在玩的逻辑游戏',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/60cb640f/group6/M00/71/E5/CmQUNlbOsdGEHwzDAAAAAFGWDMQ316218681.jpg?v=iYALk3uN&t=CmQUNl1H0mQ.',
    description:
      '在生活中，数字、图形元素以及其他有趣的符号组合，总是能优雅地呈现出某些规律，而人类似乎天生就会注意和欣赏这些规律。了解事物如何彼此联系、运作是人类的本能，这对于我们自科学和思想方面取得突破性进展也有很大帮助。我们生存于多元化的世界，发现事物的规律并善用逻辑思考，将影响你生活的方方面面！本书提供了50道精心设计的逻辑游戏题，分为两个难度不同的阶段，帮你测试自己的智力水平，提升逻辑思维能力！',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
  {
    id: 6,
    title: '中国互联网商业英雄列传',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/e46d7d14/group6/M00/6B/16/CmQUN1agju6EGM01AAAAALskY8Y213298834.jpg?v=eyExaQKZ',
    description:
      '本书通过揭秘影响中国互联网历史进程的24位知名人士的成长史，生动地展现了20世纪90年代以来引人入胜的一段段创新传奇。张朝阳是如何在数字化生存中借鸡生蛋养大了自己的狐狸？丁磊在受到Hotmail拒绝后怎样另起炉灶打造自己的网易邮箱？马化腾QQ如何从ICQ的薪尽火传中汲取力量并养育出腾讯帝企鹅？马云怎样从一名英文教师演化成电子商务大师？刘强东如何在女友及亲人的反对声中一步步成就自己的大业？张小龙怎样从失败的QQ邮箱开发中汲取教训而最终成就微信辉煌？这些问题都在本书中得到了详细解答。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
  {
    id: 7,
    title: '成功的失败者：张学良传',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/f7c19eb6/group6/M00/43/AC/CmRaIVjdF9aEUuoZAAAAALiji5c795328220.jpg?v=_Pl-IWbl',
    description:
      '本书以张学良与父亲张作霖、前妻于凤至、妻子赵一荻等三个亲人，周恩来、郭松龄、宋美龄、蒋士云等四个朋友以及蒋介石、溥仪这两个当事人交往的故事为线索，梳理出其荣辱交叠、波澜起伏的人生经历，展现其复杂的性格，并对他在“九·一八”事变、西安事变等事件中的行为和心态做出精辟深邃的辨析。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
  {
    id: 8,
    title: '自我伤害防治心理学',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/b921923d/group6/M00/6B/A0/CmQUNlal4suEXe7RAAAAABlQTtA176776530.jpg?v=cd0pymhX',
    description:
      '作者林昆辉教授数十年来致力于企业、学校、家庭、社区积极心理教育与自杀防治的推展。2012年在上海开创中国国内第一个“自杀防治24小时生命热线”。本书是林教授将多年在自杀防治过程中的经验总结和汇集。书中详细介绍了自杀防治的理论与技术方法。深刻剖析和分析了自杀行为的引发和自杀者的心理过程，并通过专业且权威的心理学理论基础，并结合多年自杀防治经验，以及自杀行为给社会及环境周围人群带来的心理问题的调适及后续照护，都阐述的非常详细且实际的经验。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
  {
    id: 9,
    title: '认同感：用故事包装事实的艺术',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/c7ccc9a5/group6/M00/70/76/CmQUN1bNDKSEfCADAAAAABemVKo198144708.jpg?v=5gSmBzrf&t=CmQUN11HnCI.',
    description: '故事不仅是一种艺术创作方式，更是一种异于逻辑的思维模式。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
  {
    id: 10,
    title: '蝴蝶飞不过那片海',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/e140435f/group6/M00/13/94/CmQUOVaZ8CuEOZU8AAAAAKk7rxg017831815.jpg?v=ffq-K6Mw&t=CmQUOVqg2r8.',
    description:
      '夏朵朵的家庭是一个再婚重组的家庭，她父亲带着她，而继母带着弟弟张志康。继母对夏朵朵冷漠乃至冷酷，而懦弱的父亲在继母的淫威下也对夏朵朵逐渐忽视。夏朵朵凭借努力考上了大学，虽然学校就在本市，她也只好住进了学校宿舍。家庭的冷酷使得夏朵朵内心中想要寻找一份安全、温暖、可资依靠的爱情，她暗恋上了英俊儒雅、才华横溢而又思想成熟的梁浩笙。这一场暗恋夏朵朵理智上认为很难有结果，可情感上却越抑制越像火山一样要爆发出来。她更不知道，家里异父也异母的弟弟张志康，小时候屡屡跟她作对的“冤家”，却在长大后却成了她这个“姐姐”的保护神。一系列为爱而苦心筑成的阴谋缓缓浮出水面。夏朵朵在爱的路上不断向前走，尝尽了疼痛曲折，最终将这份虐恋放手。她步入职场后，终于释怀，也终于长大。本书主写伤痛和成长，因为虐心的恋情让夏朵朵在成长中收获颇多：有些爱一出口便是深渊万劫，所以我变成一条深海鱼，将爱藏于心底，然后轻轻把手放开。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
  {
    id: 11,
    title: '至味在人间',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/ee9649c8/group6/M00/6A/CC/CmQUNlado3CENHqDAAAAAK_icFg020523889.jpg?v=YZfX1FXp&t=CmQUNl6Is0A.',
    description:
      '十年谈吃文章首度结集，白岩松、蔡澜、柴静、冯唐、梁文道、沈宏非一致推荐。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 78,
  },
  {
    id: 12,
    title: '快手家常菜',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/bd51b902/group6/M00/6F/F6/CmQUN1bMTFGEcGQGAAAAAFUAdPI933975877.jpg?v=_4yimw3n&t=CmQUN2JGcHg.',
    description:
      '想不想又快又简单地做出美味家常菜？没问题，《快手家常菜》包教包会！　　《快手家常菜》专为工作忙碌的上班族准备，精选100余道菜品，将很受欢迎的各式小炒，如素菜小炒，肉禽蛋类小炒，河海鲜小炒等当下时尚菜一应囊括，更加入超简单凉拌菜，不费时熬煮的汤等超有人气的美食。书中的每道菜都经过小编的严格验证，保证是好吃又简单，省时又营养的业界口碑菜，更特别加入快手tips，助你轻松快速搞定家常菜。同时，《快手家常菜》加入营养一周早中晚三餐健康搭配速查和聚餐菜肴搭配推荐，让你真正一书在手，做饭不愁。',
    comment: 0,
    support: false,
    vip: false,
    source: null,
    authorInfo: {},
    content: '',
    bookshelf: false,
    progress: 58,
  },
];

export const testCommentData: readonly commentProps[] = [
  {
    id: 1,
    book_id: 3,
    reply_user_id: 4,
    content: '非常推荐大家去看，小说恐怖如斯',
    reply_user_name: '看点小故事',
    target_id: 9,
    reply_content: '小说非常精彩，感谢楼上推荐',
    time: '2022-11-14 12:39',
    target_type: 2,
    book_title: '赶尸列车',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    cover:
      'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
  }, //回复
  {
    id: 2,
    book_id: 3,
    reply_user_id: 4,
    content: '非常推荐大家去看，小说恐怖如斯',
    reply_user_name: '看点小故事',
    target_id: 9,
    reply_content: '小说非常精彩，感谢楼上推荐',
    time: '2022-11-14 12:39',
    target_type: 2,
    book_title: '赶尸列车',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    cover:
      'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
  },
  {
    id: 3,
    book_id: 3,
    target_id: 9,
    content: '非常推荐大家去看，小说恐怖如斯',
    time: '2022-11-14 12:39',
    target_type: 1,
    book_title: '赶尸列车',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    cover:
      'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
  }, //评论
  {
    id: 4,
    book_id: 3,
    target_id: 9,
    content: '非常推荐大家去看，小说恐怖如斯',
    time: '2022-11-14 12:39',
    target_type: 1,
    book_title: '赶尸列车',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    cover:
      'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
  }, //评论
  {
    id: 5,
    book_id: 3,
    reply_user_id: 4,
    content: '非常推荐大家去看，小说恐怖如斯',
    reply_user_name: '看点小故事',
    target_id: 9,
    reply_content: '小说非常精彩，感谢楼上推荐',
    time: '2022-11-14 12:39',
    target_type: 2,
    book_title: '赶尸列车',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    cover:
      'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
  },
  {
    id: 6,
    book_id: 3,
    target_id: 9,
    content: '非常推荐大家去看，小说恐怖如斯',
    time: '2022-11-14 12:39',
    target_type: 1,
    book_title: '赶尸列车',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    cover:
      'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
  }, //评论
];

//作品
export const testWorksData: readonly worksProps[] = [
  {
    id: 1,
    title: '赶尸列车',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/38c8173a/group6/M00/16/18/CmQUOVaxXIiEJY9AAAAAAFHYwBQ342446061.jpg?v=RWQwIuVB&t=CmQUOVq03UE.',
    description:
      '网络大电影《漫长一夜之赶尸列车》原著小说，同名电影由“中国梦之声”第一季冠军李祥祥倾情出演，《最漫长的那一夜》系列首部改编电影惊悚上线！改编自悬疑第一人蔡骏现象级作品《最漫长的那一夜》经典短篇之一——《最漫长的那一夜之春运赶尸列车一夜》。民工意外死亡，幸存者是赶尸匠末代传人， 发誓把他们带回家过年。春运火车将穿越大半个中国，漫漫长夜，一个赶尸匠与几具尸体，会发生多少故事？恐惧、爆笑还有流泪，祝你一路顺风！另有精彩电影拍摄花絮抢先看，更有《最漫长的那一夜之哭坟人的一夜》带你体验别样的“哭坟”故事！',
    authorInfo: {},
    word_count: 28000,
    month_update_count: 3220,
    is_finish: false,
    is_contract: false,
    channel: 'woman',
    audit_num: 12,
    all_collection: 2087,
    tags: '新书',
  },
  {
    id: 2,
    title: '零基础学画漫画4：素描技法练习本',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/eecae1e3/group6/M00/6C/9B/CmQUNlauC5uETavmAAAAANzPruo172792771.jpg?v=Qr4Ki2iQ',
    description:
      '在学习漫画的过程中，最开始的描红练习和临摹练习非常重要。对初次学习漫画绘画的朋友来说，描红无疑是练习用笔和画线的手段。在描红的过程中，读者不仅可以学习到基本线条的练习，还可以掌握漫画人物设定的各种方法，包括头部、表情、发型、身体结构、动态姿势、服装等，针对漫迷关心的重点题材和重点技术进行练习，让读者在动手过程中快速掌握绘画要点。',
    authorInfo: {},
    word_count: 28000,
    month_update_count: 3220,
    is_finish: true,
    is_contract: false,
    channel: 'woman',
    audit_num: 12,
    all_collection: 2087,
    tags: '新书',
  },
  {
    id: 3,
    title: '智慧工厂：中国制造业探索实践',
    face: 'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/6f6fc16a/group6/M00/15/D5/CmQUOVavMZuEY8QUAAAAAEy3LJE213673347.jpg?v=yeSJG_Ev&t=CmQUOVqg2vQ.',
    description:
      '本书在编撰过程中，得到了一些著名专家的悉心指导和帮助。美国辛辛那提大学预测性维护中心的李杰教授、上海科技情报所缪其浩老师均多次参加编委会会议，提供了许多真知灼见。李杰教授还提供了若干有关工业4.0和工业大数据的文章作为参考。针对本书的编撰，我也曾当面请教原教育部副部长吴启迪教授，获得了她的热情鼓励和肯定。',
    authorInfo: {},
    word_count: 28000,
    month_update_count: 3220,
    is_finish: false,
    is_contract: true,
    channel: 'man',
    audit_num: 0,
    all_collection: 2087,
    tags: '新书',
  },
];

// 榜单
export const testBookRankData: bookRankProps = {
  id: 12,
  name: '阅读',
  list: [
    {
      book_id: 1,
      book_title: '零基础学画漫画4：素描技法练习本',
      cover:
        'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/eecae1e3/group6/M00/6C/9B/CmQUNlauC5uETavmAAAAANzPruo172792771.jpg?v=Qr4Ki2iQ',
      description:
        '在学习漫画的过程中，最开始的描红练习和临摹练习非常重要。对初次学习漫画绘画的朋友来说，描红无疑是练习用笔和画线的手段。在描红的过程中，读者不仅可以学习到基本线条的练习，还可以掌握漫画人物设定的各种方法，包括头部、表情、发型、身体结构、动态姿势、服装等，针对漫迷关心的重点题材和重点技术进行练习，让读者在动手过程中快速掌握绘画要点。',
      pen_name: '芳默默',
      is_finish: 'Y',
      word_count: 287701,
      category_title: '科幻',
      all_click: 219878,
      bookshelf: 0,
      billing_type: 2,
      billing_chapter: 200,
    },
    {
      book_id: 2,
      book_title: '零基础学画漫画4：素描技法练习本',
      cover:
        'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/eecae1e3/group6/M00/6C/9B/CmQUNlauC5uETavmAAAAANzPruo172792771.jpg?v=Qr4Ki2iQ',
      description:
        '在学习漫画的过程中，最开始的描红练习和临摹练习非常重要。对初次学习漫画绘画的朋友来说，描红无疑是练习用笔和画线的手段。在描红的过程中，读者不仅可以学习到基本线条的练习，还可以掌握漫画人物设定的各种方法，包括头部、表情、发型、身体结构、动态姿势、服装等，针对漫迷关心的重点题材和重点技术进行练习，让读者在动手过程中快速掌握绘画要点。',
      pen_name: '芳默默',
      is_finish: 'Y',
      word_count: 287701,
      category_title: '科幻',
      all_click: 219878,
      bookshelf: 0,
      billing_type: 2,
      billing_chapter: 200,
    },
    {
      book_id: 3,
      book_title: '零基础学画漫画4：素描技法练习本',
      cover:
        'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/eecae1e3/group6/M00/6C/9B/CmQUNlauC5uETavmAAAAANzPruo172792771.jpg?v=Qr4Ki2iQ',
      description:
        '在学习漫画的过程中，最开始的描红练习和临摹练习非常重要。对初次学习漫画绘画的朋友来说，描红无疑是练习用笔和画线的手段。在描红的过程中，读者不仅可以学习到基本线条的练习，还可以掌握漫画人物设定的各种方法，包括头部、表情、发型、身体结构、动态姿势、服装等，针对漫迷关心的重点题材和重点技术进行练习，让读者在动手过程中快速掌握绘画要点。',
      pen_name: '芳默默',
      is_finish: 'Y',
      word_count: 287701,
      category_title: '科幻',
      all_click: 219878,
      bookshelf: 0,
      billing_type: 2,
      billing_chapter: 200,
    },
    {
      book_id: 4,
      book_title: '零基础学画漫画4：素描技法练习本',
      cover:
        'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/eecae1e3/group6/M00/6C/9B/CmQUNlauC5uETavmAAAAANzPruo172792771.jpg?v=Qr4Ki2iQ',
      description:
        '在学习漫画的过程中，最开始的描红练习和临摹练习非常重要。对初次学习漫画绘画的朋友来说，描红无疑是练习用笔和画线的手段。在描红的过程中，读者不仅可以学习到基本线条的练习，还可以掌握漫画人物设定的各种方法，包括头部、表情、发型、身体结构、动态姿势、服装等，针对漫迷关心的重点题材和重点技术进行练习，让读者在动手过程中快速掌握绘画要点。',
      pen_name: '芳默默',
      is_finish: 'Y',
      word_count: 287701,
      category_title: '科幻',
      all_click: 219878,
      bookshelf: 0,
      billing_type: 2,
      billing_chapter: 200,
    },
    {
      book_id: 5,
      book_title: '零基础学画漫画4：素描技法练习本',
      cover:
        'http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/eecae1e3/group6/M00/6C/9B/CmQUNlauC5uETavmAAAAANzPruo172792771.jpg?v=Qr4Ki2iQ',
      description:
        '在学习漫画的过程中，最开始的描红练习和临摹练习非常重要。对初次学习漫画绘画的朋友来说，描红无疑是练习用笔和画线的手段。在描红的过程中，读者不仅可以学习到基本线条的练习，还可以掌握漫画人物设定的各种方法，包括头部、表情、发型、身体结构、动态姿势、服装等，针对漫迷关心的重点题材和重点技术进行练习，让读者在动手过程中快速掌握绘画要点。',
      pen_name: '芳默默',
      is_finish: 'Y',
      word_count: 287701,
      category_title: '科幻',
      all_click: 219878,
      bookshelf: 0,
      billing_type: 2,
      billing_chapter: 200,
    },
  ],
};
