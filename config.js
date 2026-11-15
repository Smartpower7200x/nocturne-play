/* NOCTURNE 0.7: user-facing copy, all three templates. Original story card game, not tarot. */
window.RITUAL_CONFIG = {
  "brand": "NOCTURNE",
  "siteTitle": "故事抽卡",
  "themes": [
    {
      "id": "cp",
      "eyebrow": "玩法 01  /  两个人的故事",
      "title": "人物故事",
      "intro": "写下两个人的名字，抽三张卡找故事线索。最后怎么发展，你来选。",
      "inputA": "人物 1",
      "inputB": "人物 2",
      "defaultA": "月见",
      "defaultB": "迟川",
      "startLabel": "开始抽牌",
      "drawLabel": "抽三张故事卡",
      "stages": [
        "开场",
        "麻烦",
        "最后的细节"
      ],
      "resultTitle": "抽到的故事线索",
      "resultSubtitle": "三张卡，分别是开场、麻烦和最后的细节。",
      "disclaimer": "原创故事卡，随机抽牌仅供写作灵感",
      "hookQuestion": "他们现在遇到了什么事？",
      "hooks": [
        {
          "label": "很久没见",
          "plot": "{{A}}和{{B}}已经很久没见。这天在街上碰巧遇上，{{A}}本来想装作没看见。"
        },
        {
          "label": "有话没说",
          "plot": "{{A}}一直想问{{B}}一件事。今天终于见了面，却又不知道怎么开口。"
        },
        {
          "label": "刚吵完架",
          "plot": "{{A}}和{{B}}刚吵了一架。谁都没道歉，聊天框却一直没有关掉。"
        }
      ],
      "endingQuestion": "这段故事，你想怎么收尾？",
      "endings": [
        {
          "label": "{{A}}先开口",
          "plot": "{{A}}追了两步，叫住{{B}}：“等一下。”{{B}}回过头，{{A}}终于把心里那句话说了。"
        },
        {
          "label": "{{B}}先开口",
          "plot": "眼看就要各走各的，{{B}}先喊了{{A}}的名字：“你是不是还有话想说？”"
        },
        {
          "label": "谁也没开口",
          "plot": "两个人就这么走散了。{{A}}后来才知道，{{B}}那天其实也在等一个解释。"
        }
      ],
      "cards": [
        {
          "title": "未寄出的信",
          "tag": "没说出口",
          "symbol": "letter",
          "quote": "信写好了，封了口，最后还是被塞进抽屉。"
        },
        {
          "title": "雨夜同行",
          "tag": "靠近",
          "symbol": "rain",
          "quote": "雨越下越大，他们挤在同一把伞下，鞋尖都湿了。"
        },
        {
          "title": "逆光而行",
          "tag": "重逢",
          "symbol": "sun",
          "quote": "地铁口有人逆着人流走来。隔着老远，还是认出来了。"
        },
        {
          "title": "玻璃花房",
          "tag": "试探",
          "symbol": "flower",
          "quote": "花店打烊了，柜台上那束花仍然没人来取。"
        },
        {
          "title": "迟来的回声",
          "tag": "迟到的回复",
          "symbol": "wave",
          "quote": "去年发出的消息，今天突然收到了回复。"
        },
        {
          "title": "旧站台",
          "tag": "等待",
          "symbol": "star",
          "quote": "末班车开走了，还有人站在站台上看手机。"
        },
        {
          "title": "借来的火",
          "tag": "帮忙",
          "symbol": "flame",
          "quote": "打火机坏了，对方递过来一只新的。"
        },
        {
          "title": "背面的月亮",
          "tag": "秘密",
          "symbol": "moon",
          "quote": "有人删了聊天记录，另一个人却一直留着截图。"
        },
        {
          "title": "两条轨道",
          "tag": "分开",
          "symbol": "orbit",
          "quote": "本来买好同一班车的票，后来改成了两个方向。"
        },
        {
          "title": "未完的乐章",
          "tag": "旧事",
          "symbol": "music",
          "quote": "排练室里只剩一架琴，另一人的谱子还在上面。"
        },
        {
          "title": "失而复得",
          "tag": "意外",
          "symbol": "key",
          "quote": "丢了几年的钥匙，突然出现在门口信箱里。"
        },
        {
          "title": "白色潮汐",
          "tag": "照顾",
          "symbol": "wave",
          "quote": "海风把外套吹落，身边的人顺手捡了起来。"
        },
        {
          "title": "短暂晴日",
          "tag": "平常一天",
          "symbol": "sun",
          "quote": "难得放晴，他们在便利店门口各买了一支冰棍。"
        },
        {
          "title": "镜中来客",
          "tag": "心事",
          "symbol": "mirror",
          "quote": "橱窗里映着并排的两个人，其中一个先移开了眼。"
        },
        {
          "title": "最后的灯",
          "tag": "结束",
          "symbol": "lamp",
          "quote": "夜里十一点，那扇一直亮着的窗终于暗了。"
        },
        {
          "title": "星群之间",
          "tag": "想念",
          "symbol": "star",
          "quote": "手机里还留着一张合照，日期是三年前。"
        },
        {
          "title": "归途有风",
          "tag": "犹豫",
          "symbol": "wind",
          "quote": "到了路口，两人各走一边。走出几步，又有人回头。"
        },
        {
          "title": "交换名字",
          "tag": "舍不得",
          "symbol": "ring",
          "quote": "通讯录里那个改过的备注，一直没有删。"
        }
      ]
    },
    {
      "id": "muse",
      "eyebrow": "玩法 02  /  随机写作题",
      "title": "写作灵感",
      "intro": "没想好写什么？抽三张卡，凑一个开头、一件怪事和一个结尾。",
      "inputA": "故事题材",
      "inputB": "暂定名字",
      "defaultA": "悬疑",
      "defaultB": "还没取名",
      "startLabel": "抽一组写作题",
      "drawLabel": "抽三张灵感卡",
      "stages": [
        "开头",
        "麻烦",
        "收尾"
      ],
      "resultTitle": "这组可以怎么写",
      "resultSubtitle": "三张随机线索，挑你喜欢的用就行。",
      "disclaimer": "随机写作题，仅供创作参考",
      "hookQuestion": "你现在卡在哪里？",
      "hooks": [
        {
          "label": "不知道怎么开头",
          "plot": "试着从一个小场面写起。先让读者看见一件具体的事，后面再解释发生了什么。"
        },
        {
          "label": "剧情太平了",
          "plot": "给主角添一个麻烦，让人不得不作出选择。抽到的卡可以当作事故的线索。"
        },
        {
          "label": "结尾没想好",
          "plot": "先别急着交代所有答案。看看最后一张卡能不能留下一个有意思的细节。"
        }
      ],
      "endingQuestion": "想用哪种方式收尾？",
      "endings": [
        {
          "label": "真相大白",
          "plot": "最后把前面的线索连起来，给读者一个说得通的答案。"
        },
        {
          "label": "有人离开",
          "plot": "事情解决了，但有个人决定不留下。收尾可以写他走后留下的东西。"
        },
        {
          "label": "留下疑问",
          "plot": "先停在这里，让读者带着那个没回答的问题合上这一页。"
        }
      ],
      "cards": [
        {
          "title": "寂静剧院",
          "tag": "场所",
          "symbol": "star",
          "quote": "剧院里一个观众都没有，最后一排却放着一束新鲜的花。"
        },
        {
          "title": "第十三封信",
          "tag": "悬念",
          "symbol": "letter",
          "quote": "收信的人拆开信封，认出了一种不该出现的笔迹。"
        },
        {
          "title": "失重时刻",
          "tag": "异象",
          "symbol": "orbit",
          "quote": "钟敲过十二下，窗外的雨开始往天上落。"
        },
        {
          "title": "玻璃森林",
          "tag": "奇观",
          "symbol": "flower",
          "quote": "风吹过玻璃做的树，整片林子一起响了起来。"
        },
        {
          "title": "借宿的人",
          "tag": "关系",
          "symbol": "lamp",
          "quote": "来借住的人没看地图，就找到了藏钥匙的抽屉。"
        },
        {
          "title": "沉睡海岸",
          "tag": "记忆",
          "symbol": "wave",
          "quote": "退潮以后，海边露出一条地图上没有的街。"
        },
        {
          "title": "最后一把钥匙",
          "tag": "目标",
          "symbol": "key",
          "quote": "钥匙插进去，门后却是一间从未见过的卧室。"
        },
        {
          "title": "褪色月相",
          "tag": "时间",
          "symbol": "moon",
          "quote": "每次满月，镇里都会有一个人忘了自己的名字。"
        },
        {
          "title": "没有观众的歌",
          "tag": "表达",
          "symbol": "music",
          "quote": "歌唱完，舞台底下没人鼓掌，街对面的灯却亮了。"
        },
        {
          "title": "温室之冬",
          "tag": "反差",
          "symbol": "flower",
          "quote": "冬天的花房开着满园玫瑰，门锁从里面插着。"
        },
        {
          "title": "第二颗太阳",
          "tag": "变化",
          "symbol": "sun",
          "quote": "又一轮太阳升起，整座城的人都停下了手里的活。"
        },
        {
          "title": "回家的路",
          "tag": "归属",
          "symbol": "wind",
          "quote": "地图上没有这个车站，公交车却每天准时停靠。"
        }
      ]
    },
    {
      "id": "event",
      "eyebrow": "玩法 03  /  活动纪念",
      "title": "活动纪念",
      "intro": "要去见朋友、看演出或参加活动？抽几张卡，给今天留个小纪念。",
      "inputA": "今天的活动",
      "inputB": "给这天起个名字",
      "defaultA": "周末见面会",
      "defaultB": "出门的一天",
      "startLabel": "抽一张纪念组合",
      "drawLabel": "抽三张纪念卡",
      "stages": [
        "今天的心情",
        "能做的小事",
        "回家以后"
      ],
      "resultTitle": "今天的三张纪念卡",
      "resultSubtitle": "都是小点子，想用哪个就用哪个。",
      "disclaimer": "活动纪念卡，不预测抽选结果或中奖机会",
      "hookQuestion": "今天最想记住什么？",
      "hooks": [
        {
          "label": "出发前",
          "plot": "先记下出门前的心情。带上要用的东西，别忘了安排回程。"
        },
        {
          "label": "和朋友一起",
          "plot": "抽完可以和朋友对照结果，说说各自最期待的是什么。"
        },
        {
          "label": "回家以后",
          "plot": "不一定要写长篇日记。记下今天最好笑、最开心的一件小事就行。"
        }
      ],
      "endingQuestion": "这张纪念卡准备给谁？",
      "endings": [
        {
          "label": "留给自己",
          "plot": "把今天的照片和这张卡一起存下来。过段时间再看，也许还记得当时说了什么。"
        },
        {
          "label": "发给朋友",
          "plot": "挑一张合照或者一件小事发给朋友，问问对方今天玩得开不开心。"
        },
        {
          "label": "写张祝福卡",
          "plot": "写一句真心话，别照搬套话。写完可以截下来发出去。"
        }
      ],
      "cards": [
        {
          "title": "手写祝福",
          "tag": "表达",
          "symbol": "letter",
          "quote": "想对对方说什么，就写一句自己平时真会说的话。"
        },
        {
          "title": "随身小物",
          "tag": "灵感",
          "symbol": "key",
          "quote": "挑一样今天随身带的小东西，回家后收好。"
        },
        {
          "title": "合影构图",
          "tag": "创意",
          "symbol": "star",
          "quote": "拍照前看看背景，别把路人挤进镜头。"
        },
        {
          "title": "等待开场",
          "tag": "心情",
          "symbol": "lamp",
          "quote": "排队时看看时间，顺手确认一下入场口。"
        },
        {
          "title": "回程清单",
          "tag": "照顾",
          "symbol": "moon",
          "quote": "回程前检查钥匙、证件、钱包和手机。"
        },
        {
          "title": "见面以后",
          "tag": "纪念",
          "symbol": "flower",
          "quote": "回家写两行字：最好玩的是哪件事？"
        },
        {
          "title": "安全抵达",
          "tag": "准备",
          "symbol": "orbit",
          "quote": "出发前查好路线，别等散场才找车。"
        },
        {
          "title": "今日歌单",
          "tag": "氛围",
          "symbol": "music",
          "quote": "挑一首今天听到的歌，回家路上再放一次。"
        },
        {
          "title": "欢呼时刻",
          "tag": "喜悦",
          "symbol": "sun",
          "quote": "最开心的瞬间如果没拍到，也可以写下来。"
        }
      ]
    }
  ]
};
