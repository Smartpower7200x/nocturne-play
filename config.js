/*
 * RITUAL / 仪式引擎 V0.4
 * 所有模版内容、卡牌文案和品牌标题可修改；无需第三方 AI 或服务器。
 * 结果只用于原创故事、应援活动与创作灵感，不构成运势预测或现实决策建议。
 */
window.RITUAL_CONFIG = {
  brand: 'NOCTURNE',
  siteTitle: 'THE RITUAL ROOM',
  themes: [
    {
      id: 'cp', eyebrow: 'CHAPTER 01 / FICTIONAL CONNECTIONS',
      title: '关系剧场', intro: '为两个虚构角色，抽取一段未曾写下的故事。',
      inputA: '角色 A', inputB: '角色 B', defaultA: '月见', defaultB: '迟川',
      startLabel: '进入关系剧场', drawLabel: '请选择三张故事卡',
      stages: ['初见', '暗涌', '转折'],
      resultTitle: '故事落在这一页', resultSubtitle: '三个片段，一种可以继续书写的关系。',
      disclaimer: '原创角色故事灵感生成 · 仅供创作与娱乐',
      hookQuestion: '如果能写下一幕，你更想看什么？',
      hooks: [
        {label:'意外重逢', plot:'{{A}}和{{B}}在「{{first}}」之后再度相遇。「{{middle}}」是他们各自不肯提起的旧事，而「{{last}}」会让这次重逢走向另一种可能。'},
        {label:'没说出口', plot:'把「{{first}}」当成{{A}}留下的痕迹，「{{middle}}」当成{{B}}的误解。等到「{{last}}」出现，那句迟迟没说出口的话，或许终于有了收信人。'},
        {label:'谁先靠近', plot:'从「{{first}}」到「{{middle}}」，两人都没有真正离开故事。如果以「{{last}}」作结，你可以决定由{{A}}先行动，还是让{{B}}走完最后一段路。'}
      ],
      endingQuestion:'这次重逢，谁会先迈出下一步？',
      endings:[
        {label:'{{A}}先回头', plot:'{{A}}最终走到{{B}}面前。面对「{{last}}」，{{A}}没有再把决定留给命运，而是主动叫出了{{B}}的名字。'},
        {label:'{{B}}先开口', plot:'当「{{last}}」出现，{{B}}打破了两人之间的沉默。{{A}}还没想好怎么回答，熟悉的名字已经被叫出了口。'},
        {label:'擦肩而过', plot:'「{{last}}」没有带来重逢。{{A}}与{{B}}各自向前走去，只留下「{{middle}}」作为两人都明白却没能挽回的瞬间。'}
      ],
      cards: [
        {title:'未寄出的信', tag:'克制',symbol:'letter',quote:'有些话在纸上写过千遍，见面时依然说不出口。'},
        {title:'雨夜同行',tag:'靠近',symbol:'rain',quote:'两把伞都忘了带，他们却走得比平时慢。'},
        {title:'逆光而行',tag:'守护',symbol:'sun',quote:'一个人站在光里，另一个人看见了他的影子。'},
        {title:'玻璃花房',tag:'试探',symbol:'flower',quote:'谁也没有伸手，花枝却偏向了同一边。'},
        {title:'迟来的回声',tag:'误解',symbol:'wave',quote:'他们听见的不是同一句话，却都记了很久。'},
        {title:'旧站台',tag:'重逢',symbol:'star',quote:'列车来过又走，等人的位置没有变。'},
        {title:'借来的火',tag:'信任',symbol:'flame',quote:'黑暗里有一簇亮光，最先照到的是另一个人的手。'},
        {title:'背面的月亮',tag:'秘密',symbol:'moon',quote:'月亮转过身，还有一半故事没人知道。'},
        {title:'两条轨道',tag:'错过',symbol:'orbit',quote:'他们曾经并肩一段路，后来各自驶向远方。'},
        {title:'未完的乐章',tag:'默契',symbol:'music',quote:'下一句还没弹出来，另一个人已经跟上了节拍。'},
        {title:'失而复得',tag:'选择',symbol:'key',quote:'最难的不是寻找，而是在重逢时仍愿意留下。'},
        {title:'白色潮汐',tag:'牵引',symbol:'wave',quote:'潮水退去以后，岸边多了一枚并排的脚印。'},
        {title:'短暂晴日',tag:'温柔',symbol:'sun',quote:'那天没有什么大事，他们后来却常常想起。'},
        {title:'镜中来客',tag:'共鸣',symbol:'mirror',quote:'隔着玻璃，连犹豫都像是同一种形状。'},
        {title:'最后的灯',tag:'等待',symbol:'lamp',quote:'街道逐渐暗下去，还有一扇窗没有熄灯。'},
        {title:'星群之间',tag:'距离',symbol:'star',quote:'离得很远的两颗星，也可能落进同一幅星图。'},
        {title:'归途有风',tag:'和解',symbol:'wind',quote:'不是所有裂缝都会合拢，但风终于能吹过去。'},
        {title:'交换名字',tag:'承诺',symbol:'ring',quote:'他们没有许诺永远，只认真记住了彼此的名字。'}
      ]
    },
    {
      id:'muse', eyebrow:'CHAPTER 02 / CREATIVE SPARKS',
      title:'灵感漫游', intro:'随手抽三张，把随机性变成故事的起笔。',
      inputA:'创作主题', inputB:'作品名称', defaultA:'夜航', defaultB:'未命名手稿',
      startLabel:'打开灵感牌盒', drawLabel:'请选择三张灵感卡', stages:['意象','冲突','余韵'],
      resultTitle:'灵感正在发光', resultSubtitle:'把三种意象带进你的下一段创作。',
      disclaimer:'创作提示卡 · 随机组合不具有预测能力',
      hookQuestion: '现在最缺哪一块故事拼图？',
      hooks: [
        {label:'开场画面', plot:'从「{{first}}」的画面写起，让「{{middle}}」打破表面的平静。「{{last}}」不要急着解释，留给读者继续想象。'},
        {label:'人物冲突', plot:'让角色在「{{first}}」面前作出选择，用「{{middle}}」制造代价，最后由「{{last}}」改变他们对彼此的判断。'},
        {label:'意外结尾', plot:'先埋下「{{first}}」与「{{middle}}」两条线索，让「{{last}}」在最后一页重新解释前面发生的一切。'}
      ],
      endingQuestion:'故事翻到最后，你更想留下什么？',
      endings:[
        {label:'让线索合拢', plot:'将「{{first}}」与「{{middle}}」藏在同一个真相里，等到「{{last}}」揭开谜底，读者才明白自己一直看错了什么。'},
        {label:'让人物离开', plot:'人物在「{{middle}}」之后选择离开。「{{last}}」成为他没有带走的东西，另一个人直到很久之后才发现。'},
        {label:'停在悬念里', plot:'故事在「{{last}}」出现时戛然而止。「{{first}}」的含义因此改变，而「{{middle}}」仍然无人解释。'}
      ],
      cards:[
        {title:'寂静剧院', tag:'场所',symbol:'star',quote:'空无一人的剧院，最后一排却有一束花。'},
        {title:'第十三封信',tag:'悬念',symbol:'letter',quote:'收到信的人，不应该认识寄件人的笔迹。'},
        {title:'失重时刻',tag:'异象',symbol:'orbit',quote:'钟声敲响以后，城市里的雨突然向上落。'},
        {title:'玻璃森林',tag:'奇观',symbol:'flower',quote:'风一吹，整座森林响起同一个音符。'},
        {title:'借宿的人',tag:'关系',symbol:'lamp',quote:'陌生访客认识屋里的每一处陈设。'},
        {title:'沉睡海岸',tag:'记忆',symbol:'wave',quote:'海水退去，露出一条早已消失的街。'},
        {title:'最后一把钥匙',tag:'目标',symbol:'key',quote:'门后不是房间，而是某人遗失的一天。'},
        {title:'褪色月相',tag:'时间',symbol:'moon',quote:'每个满月，人们都忘记一个微不足道的名字。'},
        {title:'没有观众的歌',tag:'表达',symbol:'music',quote:'他唱完之后，远处一盏灯亮了。'},
        {title:'温室之冬',tag:'反差',symbol:'flower',quote:'花房开满白色玫瑰，却再没有人进去。'},
        {title:'第二颗太阳',tag:'变化',symbol:'sun',quote:'人们习惯了夜晚，直到天边升起另一轮光。'},
        {title:'回家的路',tag:'归属',symbol:'wind',quote:'地图上不存在的车站，仍有人每日经过。'}
      ]
    },
    {
      id:'event',eyebrow:'CHAPTER 03 / FAN MOMENTS',
      title:'应援瞬间',intro:'为喜欢的活动，留下专属纪念和可分享的仪式。',
      inputA:'活动昵称',inputB:'应援主题',defaultA:'星光见面日',defaultB:'今天也要闪闪发光',
      startLabel:'领取今日心情卡',drawLabel:'请选择三张纪念卡', stages:['今日心情','应援灵感','留念时刻'],
      resultTitle:'将此刻收进卡片',resultSubtitle:'这是一份活动纪念，不替你决定消费或抽选结果。',
      disclaimer:'活动娱乐互动 · 不代表签售抽选结果或中奖概率',
      hookQuestion: '今天想留下哪一种纪念？',
      hooks: [
        {label:'出发心情', plot:'用「{{first}}」记录期待，让「{{middle}}」成为今天的小小惊喜。等到了「{{last}}」，记得留下一张照片。'},
        {label:'朋友共玩', plot:'把「{{first}}」发给朋友，互相聊聊「{{middle}}」会让你们想到什么。至于「{{last}}」，不妨各自写一个版本。'},
        {label:'归途回忆', plot:'从「{{first}}」写起，再记下「{{middle}}」的瞬间。留给「{{last}}」一行文字，提醒未来的自己那天发生过什么。'}
      ],
      endingQuestion:'今天的这份纪念，你想留给谁？',
      endings:[
        {label:'留给自己', plot:'把「{{last}}」写在今天的日记里。等到下次翻开，你会想起「{{first}}」时的心情。'},
        {label:'寄给朋友', plot:'把「{{middle}}」的故事讲给朋友听，再用「{{last}}」写下约好下次见面的理由。'},
        {label:'送给喜欢的人', plot:'以「{{first}}」作为开头，留下一句真诚的祝福。「{{last}}」只是纪念，重要的是你愿意表达。'}
      ],
      cards:[
        {title:'手写祝福', tag:'表达',symbol:'letter',quote:'写下一句真正想说的话，简单也很珍贵。'},
        {title:'随身小物',tag:'灵感',symbol:'key',quote:'为今天挑选一件有纪念意义的小物品。'},
        {title:'合影构图',tag:'创意',symbol:'star',quote:'试试用留白，把今天的故事放进画面。'},
        {title:'等待开场',tag:'心情',symbol:'lamp',quote:'期待本身，就是今天可以收藏的一部分。'},
        {title:'回程清单',tag:'照顾',symbol:'moon',quote:'确认交通、手机电量和随身物品。'},
        {title:'见面以后',tag:'纪念',symbol:'flower',quote:'留一小段文字给今天，日后再翻开。'},
        {title:'安全抵达',tag:'准备',symbol:'orbit',quote:'先确认出行路线和返程时间，再享受活动。'},
        {title:'今日歌单',tag:'氛围',symbol:'music',quote:'用一首歌，把这次相遇留在记忆里。'},
        {title:'欢呼时刻',tag:'喜悦',symbol:'sun',quote:'再平常的一天，也可以有值得期待的闪光。'}
      ]
    }
  ]
};
