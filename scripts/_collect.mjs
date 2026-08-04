// src/data/alphabet.ts
var V = [
  { char: "\u314F", romanization: "a", name: "\uC544", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u5634\u81EA\u7136\u5F20\u5F00\uFF0C\u820C\u8EAB\u5E73\u653E\uFF0C\u7C7B\u4F3C\u6C49\u8BED\u201C\u554A\u201D\u3002", example: { word: "\uC544\uBE60", roman: "appa", zh: "\u7238\u7238" } },
  { char: "\u3153", romanization: "eo", name: "\uC5B4", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u6BD4\u201C\u554A\u201D\u53E3\u578B\u7565\u5C0F\uFF0C\u820C\u8EAB\u540E\u7F29\uFF0C\u7C7B\u4F3C\u201C\u997F\u201D\u7684\u8F7B\u58F0\u3002", example: { word: "\uC5B4\uBA38\uB2C8", roman: "eomeoni", zh: "\u5988\u5988" } },
  { char: "\u3157", romanization: "o", name: "\uC624", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u53CC\u5507\u6536\u5706\u5411\u524D\u7A81\u51FA\uFF0C\u7C7B\u4F3C\u201C\u54E6\u201D\u3002", example: { word: "\uC624\uBE60", roman: "oppa", zh: "\u54E5\u54E5" } },
  { char: "\u315C", romanization: "u", name: "\uC6B0", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u53CC\u5507\u6536\u5F97\u66F4\u5706\u66F4\u7A81\u51FA\uFF0C\u7C7B\u4F3C\u201C\u4E4C\u201D\u3002", example: { word: "\uC6B0\uC720", roman: "uyu", zh: "\u725B\u5976" } },
  { char: "\u3161", romanization: "eu", name: "\uC73C", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u5634\u5FAE\u5F20\uFF0C\u820C\u8EAB\u5E73\u653E\uFF0C\u53CC\u5507\u653E\u677E\uFF0C\u65E0\u5BF9\u5E94\u6C49\u8BED\u97F3\uFF0C\u7C7B\u4F3C\u201C\u8BD7\u201D\u7684\u97F5\u6BCD\u3002", example: { word: "\uADF8\uB987", roman: "geureut", zh: "\u7897" } },
  { char: "\u3163", romanization: "i", name: "\uC774", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u5634\u89D2\u5411\u4E24\u8FB9\u5C55\u5F00\uFF0C\u820C\u9762\u524D\u62AC\uFF0C\u7C7B\u4F3C\u201C\u8863\u201D\u3002", example: { word: "\uC774\uBE68", roman: "ippal", zh: "\u7259\u9F7F" } },
  { char: "\u3150", romanization: "ae", name: "\uC560", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u5634\u5F20\u5F97\u6BD4\u201C\u3154\u201D\u5927\uFF0C\u7C7B\u4F3C\u201C\u7231\u201D\u7684\u97F5\u6BCD\u3002", example: { word: "\uAC1C", roman: "gae", zh: "\u72D7" } },
  { char: "\u3154", romanization: "e", name: "\uC5D0", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u5634\u534A\u5F00\uFF0C\u820C\u8EAB\u7565\u62AC\uFF0C\u7C7B\u4F3C\u201C\u8036\u201D\u7684\u8F7B\u58F0\u3002", example: { word: "\uACC4\uB780", roman: "gyeran", zh: "\u9E21\u86CB" } },
  { char: "\u315A", romanization: "oe", name: "\uC678", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u5148\u53D1\u201C\u3157\u201D\u518D\u6ED1\u5411\u201C\u3163\u201D\uFF0C\u7C7B\u4F3C\u201C\u7EA6\u201D\u3002", example: { word: "\uAF43", roman: "kkot", zh: "\u82B1" } },
  { char: "\u315F", romanization: "wi", name: "\uC704", category: "vowel", group: "\u5355\u5143\u97F3", description: "\u5148\u53D1\u201C\u315C\u201D\u518D\u6ED1\u5411\u201C\u3163\u201D\uFF0C\u7C7B\u4F3C\u201C\u9C7C\u201D\u3002", example: { word: "\uC704", roman: "wi", zh: "\u4E0A\u9762" } },
  { char: "\u3151", romanization: "ya", name: "\uC57C", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3163\u201D+\u201C\u314F\u201D\uFF0C\u7C7B\u4F3C\u201C\u5440\u201D\u3002", example: { word: "\uC57C\uAD6C", roman: "yagu", zh: "\u68D2\u7403" } },
  { char: "\u3155", romanization: "yeo", name: "\uC5EC", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3163\u201D+\u201C\u3153\u201D\uFF0C\u7C7B\u4F3C\u201C\u91CE\u201D\u3002", example: { word: "\uC5EC\uC790", roman: "yeoja", zh: "\u5973\u5B50" } },
  { char: "\u315B", romanization: "yo", name: "\uC694", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3163\u201D+\u201C\u3157\u201D\uFF0C\u7C7B\u4F3C\u201C\u54DF\u201D\u3002", example: { word: "\uC694\uB9AC", roman: "yori", zh: "\u6599\u7406" } },
  { char: "\u3160", romanization: "yu", name: "\uC720", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3163\u201D+\u201C\u315C\u201D\uFF0C\u7C7B\u4F3C\u201C\u67DA\u201D\u3002", example: { word: "\uC720\uB9AC", roman: "yuri", zh: "\u73BB\u7483" } },
  { char: "\u3152", romanization: "yae", name: "\uC598", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3163\u201D+\u201C\u3150\u201D\uFF0C\u7C7B\u4F3C\u201C\u8036\u201D\u3002", example: { word: "\uC598\uAE30", roman: "yaegi", zh: "\u6545\u4E8B" } },
  { char: "\u3156", romanization: "ye", name: "\uC608", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3163\u201D+\u201C\u3154\u201D\uFF0C\u7C7B\u4F3C\u201C\u4E5F\u201D\u3002", example: { word: "\uC608\uC058\uB2E4", roman: "yeppeuda", zh: "\u6F02\u4EAE" } },
  { char: "\u3158", romanization: "wa", name: "\uC640", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3157\u201D+\u201C\u314F\u201D\uFF0C\u7C7B\u4F3C\u201C\u54C7\u201D\u3002", example: { word: "\uACFC\uC77C", roman: "gwa-il", zh: "\u6C34\u679C" } },
  { char: "\u315D", romanization: "wo", name: "\uC6CC", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u315C\u201D+\u201C\u3153\u201D\uFF0C\u7C7B\u4F3C\u201C\u7A9D\u201D\u3002", example: { word: "\uC6CC\uD130", roman: "woteo", zh: "\u6C34\uFF08water\uFF09" } },
  { char: "\u3159", romanization: "wae", name: "\uC65C", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3157\u201D+\u201C\u3150\u201D\uFF0C\u7C7B\u4F3C\u201C\u5916\u201D\u3002", example: { word: "\uC65C", roman: "wae", zh: "\u4E3A\u4EC0\u4E48" } },
  { char: "\u315E", romanization: "we", name: "\uC6E8", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u315C\u201D+\u201C\u3154\u201D\uFF0C\u7C7B\u4F3C\u201C\u536B\u201D\u7684\u5408\u97F3\u3002", example: { word: "\uC6E8\uB529", roman: "weding", zh: "\u5A5A\u793C\uFF08wedding\uFF09" } },
  { char: "\u3162", romanization: "ui", name: "\uC758", category: "vowel", group: "\u53CC\u5143\u97F3", description: "\u201C\u3161\u201D+\u201C\u3163\u201D\uFF1B\u8BCD\u9996\u8BFB\u201C\uC758\u201D\uFF0C\u8BCD\u4E2D\u5E38\u8BFB\u201C\u3163\u201D\u3002", example: { word: "\uC758\uC790", roman: "uija", zh: "\u6905\u5B50" } }
];
var C = [
  { char: "\u3131", romanization: "g", name: "\uAE30\uC5ED", category: "consonant", group: "\u677E\u97F3", description: "\u820C\u6839\u62B5\u8F6F\u816D\uFF0C\u58F0\u5E26\u4E0D\u7D27\u5F20\uFF0C\u7C7B\u4F3C\u201C\u6B4C\u201D\u7684\u58F0\u6BCD\uFF08\u5E73\u97F3\uFF09\u3002", example: { word: "\uAD6C", roman: "gu", zh: "\u7403/\u4E5D" } },
  { char: "\u3137", romanization: "d", name: "\uB514\uADFF", category: "consonant", group: "\u677E\u97F3", description: "\u820C\u5C16\u62B5\u4E0A\u9F7F\u9F88\uFF0C\u7C7B\u4F3C\u201C\u5F97\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uB2E4\uB9AC", roman: "dari", zh: "\u817F" } },
  { char: "\u3142", romanization: "b", name: "\uBE44\uC74D", category: "consonant", group: "\u677E\u97F3", description: "\u53CC\u5507\u95ED\u5408\u540E\u5F20\u5F00\uFF0C\u7C7B\u4F3C\u201C\u6CE2\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uBC14\uB2E4", roman: "bada", zh: "\u6D77" } },
  { char: "\u3145", romanization: "s", name: "\uC2DC\uC637", category: "consonant", group: "\u677E\u97F3", description: "\u820C\u5C16\u9760\u8FD1\u4E0A\u9F7F\u9F88\uFF0C\u6C14\u6D41\u6469\u64E6\u800C\u51FA\uFF0C\u7C7B\u4F3C\u201C\u601D\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uC0AC\uACFC", roman: "sagwa", zh: "\u82F9\u679C" } },
  { char: "\u3148", romanization: "j", name: "\uC9C0\uC752", category: "consonant", group: "\u677E\u97F3", description: "\u820C\u9762\u524D\u90E8\u63A5\u8FD1\u786C\u816D\uFF0C\u7C7B\u4F3C\u201C\u8D44\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uC790\uC7A5\uBA74", roman: "jajangmyeon", zh: "\u70B8\u9171\u9762" } },
  { char: "\u3132", romanization: "kk", name: "\uC30D\uAE30\uC5ED", category: "consonant", group: "\u7D27\u97F3", description: "\u4E0E\u3131\u540C\u90E8\u4F4D\uFF0C\u4F46\u58F0\u5E26\u4E0E\u808C\u8089\u7D27\u5F20\uFF0C\u53D1\u97F3\u77ED\u4FC3\u7528\u529B\uFF08\u7D27\u97F3\uFF09\u3002", example: { word: "\uAF2C\uB9C8", roman: "kkoma", zh: "\u5C0F\u5B69" } },
  { char: "\u3138", romanization: "tt", name: "\uC30D\uB514\uADFF", category: "consonant", group: "\u7D27\u97F3", description: "\u4E0E\u3137\u540C\u90E8\u4F4D\uFF0C\u7D27\u97F3\uFF0C\u77ED\u4FC3\u6709\u529B\u3002", example: { word: "\uB538", roman: "ttal", zh: "\u5973\u513F" } },
  { char: "\u3143", romanization: "pp", name: "\uC30D\uBE44\uC74D", category: "consonant", group: "\u7D27\u97F3", description: "\u4E0E\u3142\u540C\u90E8\u4F4D\uFF0C\u7D27\u97F3\u3002", example: { word: "\uBE75", roman: "ppang", zh: "\u9762\u5305" } },
  { char: "\u3146", romanization: "ss", name: "\uC30D\uC2DC\uC637", category: "consonant", group: "\u7D27\u97F3", description: "\u4E0E\u3145\u540C\u90E8\u4F4D\uFF0C\u7D27\u97F3\u3002", example: { word: "\uC4F0\uB2E4", roman: "sseuda", zh: "\u5199" } },
  { char: "\u3149", romanization: "jj", name: "\uC30D\uC9C0\uC752", category: "consonant", group: "\u7D27\u97F3", description: "\u4E0E\u3148\u540C\u90E8\u4F4D\uFF0C\u7D27\u97F3\u3002", example: { word: "\uC9DC\uC7A5\uBA74", roman: "jjajangmyeon", zh: "\u70B8\u9171\u9762" } },
  { char: "\u314B", romanization: "k", name: "\uD0A4\uC754", category: "consonant", group: "\u9001\u6C14\u97F3", description: "\u4E0E\u3131\u540C\u90E8\u4F4D\uFF0C\u9001\u6C14\u5F3A\uFF0C\u7C7B\u4F3C\u201C\u79D1\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uCEE4\uD53C", roman: "keopi", zh: "\u5496\u5561" } },
  { char: "\u314C", romanization: "t", name: "\uD2F0\uC755", category: "consonant", group: "\u9001\u6C14\u97F3", description: "\u4E0E\u3137\u540C\u90E8\u4F4D\uFF0C\u9001\u6C14\u5F3A\uFF0C\u7C7B\u4F3C\u201C\u4ED6\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uD1A0\uB9C8\uD1A0", roman: "tomato", zh: "\u756A\u8304" } },
  { char: "\u314D", romanization: "p", name: "\uD53C\uC756", category: "consonant", group: "\u9001\u6C14\u97F3", description: "\u4E0E\u3142\u540C\u90E8\u4F4D\uFF0C\u9001\u6C14\u5F3A\uFF0C\u7C7B\u4F3C\u201C\u5761\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uD53C\uC790", roman: "pija", zh: "\u62AB\u8428" } },
  { char: "\u314A", romanization: "ch", name: "\uCE58\uC753", category: "consonant", group: "\u9001\u6C14\u97F3", description: "\u4E0E\u3148\u540C\u90E8\u4F4D\uFF0C\u9001\u6C14\u5F3A\uFF0C\u7C7B\u4F3C\u201C\u5403\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uCE5C\uAD6C", roman: "chingu", zh: "\u670B\u53CB" } },
  { char: "\u3134", romanization: "n", name: "\uB2C8\uC740", category: "consonant", group: "\u9F3B\u97F3\u4E0E\u6D41\u97F3", description: "\u820C\u5C16\u62B5\u4E0A\u9F7F\u9F88\uFF0C\u6C14\u6D41\u4ECE\u9F3B\u8154\u51FA\uFF0C\u7C7B\u4F3C\u201C\u90A3\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uB098\uBE44", roman: "nabi", zh: "\u8774\u8776" } },
  { char: "\u3139", romanization: "r/l", name: "\uB9AC\uC744", category: "consonant", group: "\u9F3B\u97F3\u4E0E\u6D41\u97F3", description: "\u820C\u5C16\u5F39\u4E0A\u9F7F\u9F88\uFF0C\u8BCD\u9996\u53D1\u201C\u3139\u201D\u8FD1\u4F3C\u201Cr\u201D\uFF0C\u8BCD\u4E2D/\u5C3E\u8FD1\u4F3C\u201Cl\u201D\u3002", example: { word: "\uB77C\uB514\uC624", roman: "radio", zh: "\u6536\u97F3\u673A" } },
  { char: "\u3141", romanization: "m", name: "\uBBF8\uC74C", category: "consonant", group: "\u9F3B\u97F3\u4E0E\u6D41\u97F3", description: "\u53CC\u5507\u95ED\u5408\uFF0C\u6C14\u6D41\u4ECE\u9F3B\u8154\u51FA\uFF0C\u7C7B\u4F3C\u201C\u5988\u201D\u7684\u58F0\u6BCD\u3002", example: { word: "\uB9C8\uC744", roman: "ma-eul", zh: "\u6751\u5E84" } },
  { char: "\u3147", romanization: "ng", name: "\uC774\uC751", category: "consonant", group: "\u9F3B\u97F3\u4E0E\u6D41\u97F3", description: "\u4F5C\u8F85\u97F3\u65F6\u4E0D\u53D1\u97F3\uFF1B\u4F5C\u6536\u97F3\u65F6\u4E3A\u540E\u9F3B\u97F3\u201Cng\u201D\u3002", example: { word: "\uC544\uC774", roman: "ai", zh: "\u5B69\u5B50" } },
  { char: "\u314E", romanization: "h", name: "\uD788\uC757", category: "consonant", group: "\u6469\u64E6\u97F3", description: "\u58F0\u95E8\u6469\u64E6\u6210\u97F3\uFF0C\u7C7B\u4F3C\u201C\u559D\u201D\u7684\u58F0\u6BCD\uFF0C\u5E38\u5F15\u53D1\u9001\u6C14\u5316\u3002", example: { word: "\uD558\uB298", roman: "haneul", zh: "\u5929\u7A7A" } }
];
var B_SINGLE = [
  { char: "\u3131", rep: "\u3131[\u3131]", word: "\uAD6D", roman: "guk", zh: "\u6C64" },
  { char: "\u3134", rep: "\u3134[\u3134]", word: "\uC0B0", roman: "san", zh: "\u5C71" },
  { char: "\u3137", rep: "\u3137[\u3137]", word: "\uBC1B", roman: "bat", zh: "\uBC1B\uB2E4\uFF08\u53D7\uFF09" },
  { char: "\u3139", rep: "\u3139[\u3139]", word: "\uB2EC", roman: "dal", zh: "\u6708\u4EAE" },
  { char: "\u3141", rep: "\u3141[\u3141]", word: "\uBD04", roman: "bom", zh: "\u6625\u5929" },
  { char: "\u3142", rep: "\u3142[\u3142]", word: "\uC785", roman: "ip", zh: "\u5634" },
  { char: "\u3145", rep: "\u3145[\u3137]", word: "\uC788\uB2E4", roman: "itda", zh: "\u6709" },
  { char: "\u3147", rep: "\u3147[\u3147]", word: "\uAC15", roman: "gang", zh: "\u6C5F" },
  { char: "\u3148", rep: "\u3148[\u3137]", word: "\uC816", roman: "jeot", zh: "\u5976" },
  { char: "\u314A", rep: "\u314A[\u3137]", word: "\uAF43", roman: "kkot", zh: "\u82B1" },
  { char: "\u314B", rep: "\u314B[\u3131]", word: "\uBD80\uC5CC", roman: "bueok", zh: "\u53A8\u623F" },
  { char: "\u3131", rep: "\u3131[\u3131]", word: "\uBC16", roman: "bak", zh: "\u5916\u9762" },
  { char: "\u314D", rep: "\u314D[\u3142]", word: "\uC55E", roman: "ap", zh: "\u524D\u9762" },
  { char: "\u314E", rep: "\u314E[\u3137]", word: "\uC88B\uB2E4", roman: "jota", zh: "\u597D" }
];
var B_DOUBLE = [
  { char: "\u3132", rep: "\u3132[\u3131]", word: "\uB10B", roman: "neok", zh: "\u7075\u9B42" },
  { char: "\u3133", rep: "\u3133[\u3131]", word: "\uBAAB", roman: "mok", zh: "\u4EFD\u513F" },
  { char: "\u3135", rep: "\u3135[\u3134]", word: "\uC549\uB2E4", roman: "antda", zh: "\u5750" },
  { char: "\u3136", rep: "\u3136[\u3134]", word: "\uB9CE\uB2E4", roman: "mantda", zh: "\u591A" },
  { char: "\u313A", rep: "\u313A[\u3131]", word: "\uC77D\uB2E4", roman: "ikda", zh: "\u8BFB" },
  { char: "\u313B", rep: "\u313B[\u3141]", word: "\uC80A\uB2E4", roman: "jeomda", zh: "\u5E74\u8F7B" },
  { char: "\u313C", rep: "\u313C[\u3142]", word: "\uC5EC\uB35F", roman: "yeodeolp", zh: "\u516B" },
  { char: "\u313D", rep: "\u313D[\u3139]", word: "\uC678\uACEC", roman: "oegol", zh: "\u4E00\u6761\u9053" },
  { char: "\u3140", rep: "\u3140[\u3139]", word: "\uC783\uB2E4", roman: "ilta", zh: "\u4E22" },
  { char: "\u3144", rep: "\u3144[\u3142]", word: "\uAC12", roman: "gap", zh: "\u4EF7\u683C" },
  { char: "\u313E", rep: "\u313E[\u3139]", word: "\uD6D1\uB2E4", roman: "hultta", zh: "\u626B" },
  { char: "\u313F", rep: "\u313F[\u3142]", word: "\uC74A\uB2E4", roman: "eupda", zh: "\u541F\u8BF5" },
  { char: "\u313A", rep: "\u313A[\u3139]", word: "\uC587\uB2E4", roman: "yalta", zh: "\u8584" }
];
var B = [
  ...B_SINGLE.map((b) => ({
    char: b.char,
    romanization: b.rep,
    name: "\uBC1B\uCE68",
    category: "batchim",
    group: "\u5355\u6536\u97F3",
    description: `\u6536\u97F3\uFF08\u97F5\u5C3E\uFF09\uFF0C\u4EE3\u8868\u97F3 ${b.rep}\u3002`,
    example: { word: b.word, roman: b.roman, zh: b.zh },
    represents: b.rep
  })),
  ...B_DOUBLE.map((b) => ({
    char: b.char,
    romanization: b.rep,
    name: "\uACB9\uBC1B\uCE68",
    category: "batchim",
    group: "\u53CC\u6536\u97F3",
    description: `\u53CC\u6536\u97F3\uFF0C\u4EE3\u8868\u97F3 ${b.rep}\uFF08\u5DE6\u7559\u53F3\u79FB/\u7EFC\u5408\uFF09\u3002`,
    example: { word: b.word, roman: b.roman, zh: b.zh },
    represents: b.rep
  }))
];
var ALPHABET = [...V, ...C, ...B];

// src/data/pronunciation.ts
var PRONUNCIATION = [
  {
    id: "link",
    category: "A. \u8FDE\u97F3\u73B0\u8C61",
    rule: "\u524D\u4E00\u97F3\u8282\u6536\u97F3\uFF08\u9664\u3147\u3001\u314E\u5916\uFF09\u5728\u540E\u4EE5\u5143\u97F3\u5F00\u5934\u7684\u97F3\u8282\u524D\uFF0C\u79FB\u5230\u540E\u97F3\u8282\u4F5C\u9996\u97F3\uFF08\u8F85\u97F3\u79FB\u4F4D\uFF09\u3002",
    formula: "C\uFF08\u6536\u97F3\uFF09+ \u5143\u97F3 \u2192 \u6536\u97F3\u7684\u53D1\u97F3\u79FB\u5230\u4E0B\u4E00\u97F3\u8282\u5F00\u5934",
    examples: [
      { ko: "\uCC45\uC774", roman: "chae-gi", zh: "\u4E66\uFF08\u4E3B\u683C\uFF09", ipa: "[\uCC44\uAE30]" },
      { ko: "\uC885\uC774", roman: "jong-i", zh: "\u7EB8", ipa: "[\uC885\uC774]" },
      { ko: "\uBC25\uC744", roman: "ba-beul", zh: "\u996D\uFF08\u5BBE\u683C\uFF09", ipa: "[\uBC14\uBE14]" },
      { ko: "\uC0B0\uC774", roman: "san-i", zh: "\u5C71", ipa: "[\uC0AC\uB2C8]" },
      { ko: "\uC637\uC744", roman: "os-eul", zh: "\u8863\u670D", ipa: "[\uC624\uC2AC]" }
    ],
    common_errors: ["\u53CC\u6536\u97F3\u8FDE\u97F3\u201C\u5DE6\u7559\u53F3\u79FB\u201D\uFF1A\u313A\u2192\u3131\u79FB\u3001\u313B\u2192\u3141\u79FB\u3001\u313C\u2192\u3142\u79FB", "\u3147/\u314E \u4F5C\u6536\u97F3\u65F6\u4E0D\u8FDE\u97F3\uFF1A\uC885\uC774[\uC885\uC774] \u800C\u975E [\uC870\uAE30]"]
  },
  {
    id: "aspiration",
    category: "B. \u9001\u6C14\u5316\u73B0\u8C61",
    rule: "\u677E\u97F3\uFF08\u3131\u3137\u3142\u3148\uFF09\u4E0E\u314E\u76F8\u90BB\uFF0C\u6216\u314E\u4E0E\u677E\u97F3\u76F8\u90BB\u65F6\uFF0C\u677E\u97F3\u53D8\u4E3A\u9001\u6C14\u97F3\uFF08\u314B\u314C\u314D\u314A\uFF09\u3002",
    formula: "\u3131/\u3137/\u3142/\u3148 + \u314E \u2192 \u314B/\u314C/\u314D/\u314A\uFF1B\u314E + \u3131/\u3137/\u3142/\u3148 \u2192 \u314B/\u314C/\u314D/\u314A",
    examples: [
      { ko: "\uC88B\uB2E4", roman: "jo-ta", zh: "\u597D", ipa: "[\uC870\uD0C0]" },
      { ko: "\uCD95\uD558", roman: "chuk-ha", zh: "\u795D\u8D3A", ipa: "[\uCD94\uCE74]" },
      { ko: "\uC785\uD559", roman: "ip-hak", zh: "\u5165\u5B66", ipa: "[\uC774\uD30D]" },
      { ko: "\uB193\uACE0", roman: "no-ko", zh: "\u653E\u4E0B", ipa: "[\uB178\uCF54]" },
      { ko: "\uB9CF\uD615", roman: "mat-hyeong", zh: "\u957F\u5144", ipa: "[\uB9C8\uD17D]" }
    ],
    common_errors: ["\u8BEF\u8BFB\u201C\uC88B\uB2E4\u201D\u4E3A[\uC870\uD0C0]\u800C\u975E[\uC870\uD558]", "\u8BCD\u9996\u314E\u540E\u63A5\u677E\u97F3\u540C\u6837\u9001\u6C14\u5316"]
  },
  {
    id: "tense",
    category: "C. \u7D27\u97F3\u5316\u73B0\u8C61",
    rule: "\u6536\u97F3\u3131/\u3137/\u3142\u4E0E\u540E\u7EED\u3131/\u3137/\u3142/\u3145/\u3148\u76F8\u9047\u65F6\uFF0C\u540E\u4E00\u4E2A\u53D8\u4E3A\u7D27\u97F3\u3002",
    formula: "\u6536\u97F3 \u3131/\u3137/\u3142 + \u3131/\u3137/\u3142/\u3145/\u3148 \u2192 \u540E\u5B57\u7D27\u97F3",
    examples: [
      { ko: "\uD559\uAD50", roman: "hak-gyo", zh: "\u5B66\u6821", ipa: "[\uD559\uAF9C]" },
      { ko: "\uAD6D\uBC25", roman: "guk-bap", zh: "\u6C64\u996D", ipa: "[\uAD6D\uBE71]" },
      { ko: "\uD559\uC0DD", roman: "hak-saeng", zh: "\u5B66\u751F", ipa: "[\uD559\uC329]" },
      { ko: "\uC785\uACE0", roman: "ip-go", zh: "\u7A7F", ipa: "[\uC785\uAF2C]" },
      { ko: "\uAE38\uB2E4", roman: "gil-da", zh: "\u957F", ipa: "[\uAE38\uB530]" }
    ],
    common_errors: ["\u6C49\u5B57\u8BCD\u201C\u77F3\u201D\u7B49\u6536\u97F3\u3131\u4E5F\u89E6\u53D1\u7D27\u97F3\u5316", "\u51A0\u5F62\u8BCD\u5F62\u8BED\u5C3E\u201C-\uC740/-\uB294\u201D\u540E\u540C\u6837\u7D27\u97F3\u5316"]
  },
  {
    id: "palatal",
    category: "D. \u816D\u5316\u73B0\u8C61",
    rule: "\u3137/\u314C \u4E0E \uC774/\uD788 \u76F8\u90BB\u65F6\uFF0C\u816D\u5316\u4E3A \u3148/\u314A\u3002",
    formula: "\u3137 + \uC774 \u2192 \uC9C0\uFF1B\u3137 + \uD788 \u2192 \uCE58\uFF1B\u314C + \uC774 \u2192 \uCE58",
    examples: [
      { ko: "\uAC19\uC774", roman: "gat-i", zh: "\u4E00\u8D77", ipa: "[\uAC00\uCE58]" },
      { ko: "\uD574\uB3CB\uC774", roman: "hae-don-i", zh: "\u65E5\u51FA", ipa: "[\uD574\uB3C4\uC9C0]" },
      { ko: "\uAD73\uC774", roman: "gut-i", zh: "\u6267\u610F", ipa: "[\uAD6C\uC9C0]" },
      { ko: "\uBBF8\uB2EB\uC774", roman: "mi-dat-i", zh: "\u63A8\u62C9\u95E8", ipa: "[\uBBF8\uB2E4\uC9C0]" }
    ],
    common_errors: ["\u816D\u5316\u53EA\u5728 \u3137/\u314C + \uC774/\uD788 \u65F6\u53D1\u751F", "\u3139\uC774 \u4E0D\u816D\u5316\uFF08\uB784\uFF09"]
  },
  {
    id: "nasal",
    category: "E. \u8F85\u97F3\u540C\u5316\uFF08\u9F3B\u97F3\u5316\uFF09",
    rule: "\u6536\u97F3\u3131/\u3137/\u3142 \u4E0E\u540E\u7EED\u3134/\u3139/\u3141 \u76F8\u90BB\u65F6\uFF0C\u5206\u522B\u540C\u5316\u4E3A\u3147/\u3134/\u3141\uFF1B\u3141/\u3147 + \u3139 \u2192 \u3134\u3002",
    formula: "\u3131+\u3134/\u3139/\u3141\u2192\u3147\uFF1B\u3137+\u3134/\u3139/\u3141\u2192\u3134\uFF1B\u3142+\u3134/\u3139/\u3141\u2192\u3141\uFF1B\u3141/\u3147+\u3139\u2192\u3134",
    examples: [
      { ko: "\uD55C\uAD6D\uB9D0", roman: "han-guk-mal", zh: "\u97E9\u56FD\u8BDD", ipa: "[\uD55C\uAD81\uB9D0]" },
      { ko: "\uBC25\uB9DB", roman: "bap-mat", zh: "\u996D\u5473", ipa: "[\uBC24\uB9CF]" },
      { ko: "\uBA87 \uB144", roman: "myeot-nyeon", zh: "\u51E0\u5E74", ipa: "[\uBA74\uB144]" },
      { ko: "\uC2EC\uB9AC", roman: "sim-ni", zh: "\u5FC3\u7406", ipa: "[\uC2EC\uB2C8]" },
      { ko: "\uAD6D\uB9BD", roman: "guk-rip", zh: "\u56FD\u7ACB", ipa: "[\uAD81\uB2D9]" }
    ],
    common_errors: ["\u6536\u97F3\u3142\u4E0E\u3139\u76F8\u9047\u2192\u3141\uFF1A\uBC25\uB9DB[\uBC24\uB9CF]", "\u3141/\u3147 \u540E\u7684\u3139\u53D8\u3134\uFF1A\uC74C\uB825[\uC74C\uB141]"]
  },
  {
    id: "elision",
    category: "F. \u8131\u843D\u73B0\u8C61",
    rule: "\u90E8\u5206\u97F3\u8282\u4E2D\u7684 \u314E\u3001\u3139\u3001\u3145 \u5728\u8BED\u6D41\u4E2D\u8131\u843D\u4E0D\u53D1\u97F3\u3002",
    formula: "\u314E \u8131\u843D\uFF08\u5E38\u7528\uFF09\uFF1B\u3139/\u3145 \u5728\u7279\u5B9A\u8BCD\u6C47\u4E2D\u8131\u843D",
    examples: [
      { ko: "\uC88B\uC544\uC694", roman: "jo-a-yo", zh: "\u597D\uFF08\u656C\u8BED\uFF09", ipa: "[\uC870\uC544\uC694]" },
      { ko: "\uC774\uB807\uAC8C", roman: "i-reo-ke", zh: "\u8FD9\u6837", ipa: "[\uC774\uB7EC\uCF00]" },
      { ko: "\uB0B3\uB2E4", roman: "nat-da", zh: "\u751F\uFF08\u5B69\u5B50\uFF09", ipa: "[\uB098\uD0C0]" },
      { ko: "\uBD88\uBE5B", roman: "bul-bit", zh: "\u706F\u5149", ipa: "[\uBD88\uBE4B]" }
    ],
    common_errors: ["\u314E \u8131\u843D\u540E\u5E38\u4E0E\u9001\u6C14\u5316\u6DF7\u6DC6", "\u4E0D\u662F\u6240\u6709\u314E\u90FD\u8131\u843D\uFF08\u8BCD\u9996\u314E\u4FDD\u7559\uFF09"]
  },
  {
    id: "addition",
    category: "G. \u6DFB\u52A0\u73B0\u8C61",
    rule: "\u5408\u6210\u8BCD\u4E2D\u5728\u4E24\u4E2A\u8BED\u7D20\u4E4B\u95F4\u6DFB\u52A0 \u3134\uFF0C\u6216\u6DFB\u52A0 \u3137/\u3145 \u7B49\u3002",
    formula: "\u5408\u6210\u8BCD\u4E2D\u95F4\u52A0 \u3134\uFF08\uAF43+\uC78E\u2192\uAF30\uB2E2\uFF09",
    examples: [
      { ko: "\uAF43\uC78E", roman: "kkot-ip", zh: "\u82B1\u74E3", ipa: "[\uAF30\uB2E2]" },
      { ko: "\uB098\uBB47\uC78E", roman: "na-mu-nip", zh: "\u6811\u53F6", ipa: "[\uB098\uBB38\uB2E2]" },
      { ko: "\uC19C\uC774\uBD88", roman: "som-i-bul", zh: "\u68C9\u88AB", ipa: "[\uC19C\uB2C8\uBD88]" }
    ],
    common_errors: ["\u6DFB\u52A0\u53D1\u751F\u5728\u5408\u6210\u8BCD\u8FB9\u754C", "\u4E0D\u662F\u6240\u6709\u5408\u6210\u8BCD\u90FD\u52A0\u97F3"]
  },
  {
    id: "irregular",
    category: "H. \u4E0D\u89C4\u5219\u97F3\u53D8\uFF087 \u5927\u7C7B\uFF09",
    rule: "\u4E03\u7C7B\u8BCD\u5E72\u672B\u97F3\u8282\u5728\u7279\u5B9A\u8BED\u5C3E\u524D\u53D1\u751F\u7279\u6B8A\u53D8\u5316\uFF0C\u9700\u9010\u4E2A\u8BB0\u5FC6\u3002",
    formula: "\u3137/\u3142/\u3145/\u314E/\uB974/\uB7EC/\uC73C \u4E0D\u89C4\u5219",
    examples: [
      { ko: "\uAE68\uB2EB\uB2E4\u2192\uAE68\uB2EC\uC544\uC694", roman: "kkaedat-da", zh: "\u9886\u609F", ipa: "[\uAE68\uB2EC\uC544\uC694]" },
      { ko: "\uB354\uB7FD\uB2E4\u2192\uB354\uB7EC\uC6CC\uC694", roman: "deoreop-da", zh: "\u810F", ipa: "[\uB354\uB7EC\uC6CC\uC694]" },
      { ko: "\uB0AB\uB2E4\u2192\uB098\uC544\uC694", roman: "nat-da", zh: "\u75CA\u6108", ipa: "[\uB098\uC544\uC694]" },
      { ko: "\uC88B\uB2E4\u2192\uC88B\uC544\uC694", roman: "jot-da", zh: "\u597D", ipa: "[\uC870\uC544\uC694]" },
      { ko: "\uBAA8\uB974\uB2E4\u2192\uBAB0\uB77C\uC694", roman: "mo-reu-da", zh: "\u4E0D\u77E5\u9053", ipa: "[\uBAB0\uB77C\uC694]" },
      { ko: "\uC774\uB974\uB2E4\u2192\uC77C\uB7EC\uC694", roman: "ireu-da", zh: "\u544A\u8BC9", ipa: "[\uC77C\uB7EC\uC694]" },
      { ko: "\uBC14\uC058\uB2E4\u2192\uBC14\uBE60\uC694", roman: "bappeu-da", zh: "\u5FD9", ipa: "[\uBC14\uBE60\uC694]" }
    ],
    common_errors: ["\u3137\u4E0D\u89C4\u5219\uFF1A\u8BCD\u5E72\u3137\u5728\u5143\u97F3\u8BED\u5C3E\u524D\u53D8\u3139", "\uC73C\u4E0D\u89C4\u5219\uFF1A\u3161\u8131\u843D\uFF0C\u6309\u201C\uB974\u201D\u89C4\u5219\u53D8\u5316"]
  },
  {
    id: "ui",
    category: "I. \u3162 \u7684\u53D1\u97F3\u89C4\u5219",
    rule: "\u201C\u3162\u201D\u5728\u8BCD\u9996\u53D1\u201C\u3162\u201D\uFF1B\u5728\u8BCD\u4E2D/\u975E\u91CD\u8BFB\u65F6\u5E38\u5F31\u8BFB\u4E3A\u201C\u3163\u201D\u3002",
    formula: "\u8BCD\u9996 \u2192 [\u3162]\uFF1B\u8BCD\u4E2D/\u52A9\u8BCD \uC758 \u2192 [\u3154]/[\u3163]",
    examples: [
      { ko: "\uC758\uC790", roman: "ui-ja", zh: "\u6905\u5B50", ipa: "[\uC758\uC790]" },
      { ko: "\uB098\uC758", roman: "na-ui", zh: "\u6211\u7684", ipa: "[\uB098\uC758]/[\uB098\uC5D0]" },
      { ko: "\uC0DD\uC758", roman: "saeng-ui", zh: "\u751F\u6DAF", ipa: "[\uC0DD\uC758]" }
    ],
    common_errors: ["\u52A9\u8BCD\u201C\uC758\u201D\u53E3\u8BED\u5E38\u8BFB[\uC5D0]", "\u8BCD\u9996\u201C\uC758\u201D\u4ECD\u8BFB[\uC758]"]
  },
  {
    id: "aspiration2",
    category: "J. \u7565\u9001\u6C14\u89C4\u5219",
    rule: "\u9001\u6C14\u97F3\u5728\u8BCD\u9996\u9001\u6C14\u5F3A\uFF0C\u5728\u975E\u8BCD\u9996\u4F4D\u7F6E\u9001\u6C14\u51CF\u5F31\u3002",
    formula: "\u8BCD\u9996 \u314B/\u314C/\u314D/\u314A \u9001\u6C14\u5F3A\uFF1B\u8BCD\u4E2D\u975E\u8BCD\u9996\u51CF\u5F31",
    examples: [
      { ko: "\uD1A0\uB9C8\uD1A0", roman: "to-ma-to", zh: "\u756A\u8304", ipa: "[\uD1A0\uB9C8\uD1A0]" },
      { ko: "\uCEE4\uD53C", roman: "keo-pi", zh: "\u5496\u5561", ipa: "[\uCEE4\uD53C]" }
    ],
    common_errors: ["\u975E\u8BCD\u9996\u9001\u6C14\u97F3\u6613\u4E0E\u677E\u97F3\u6DF7\u6DC6"]
  },
  {
    id: "loan",
    category: "K. \u5916\u6765\u8BED\u97F3\u53D8",
    rule: "\u5916\u6765\u8BED\uFF08\u82F1/\u65E5\u7B49\uFF09\u6309\u97E9\u56FD\u8BED\u8BED\u97F3\u4F53\u7CFB\u8F6C\u5199\uFF0C\u4EA7\u751F\u7279\u5B9A\u97F3\u53D8\u3002",
    formula: "f\u2192\u314D\uFF1Bz\u2192\u3148\uFF1Bl \u8BCD\u9996\u2192\u3139 \u7B49",
    examples: [
      { ko: "\uCEE4\uD53C", roman: "keo-pi", zh: "coffee", ipa: "[\uCEE4\uD53C]" },
      { ko: "\uB77C\uB514\uC624", roman: "ra-di-o", zh: "radio", ipa: "[\uB77C\uB514\uC624]" },
      { ko: "\uBE44\uB514\uC624", roman: "bi-di-o", zh: "video", ipa: "[\uBE44\uB514\uC624]" }
    ],
    common_errors: ["\u82F1\u8BED f \u8F6C\u5199\u4E3A \u314D\uFF08\uD53C\uC790\uC790\uFF09", "\u8BCD\u9996 r/l \u8F6C\u5199\u4E3A \u3139"]
  }
];

// src/data/vocab.ts
var VOCAB = [
  {
    topic: "\u4EBA\u7269\u5173\u7CFB",
    words: [
      { korean: "\uAC00\uC871", romanization: "gajok", chinese: "\u5BB6\u4EBA", level: "1", topic: "\u4EBA\u7269\u5173\u7CFB" },
      { korean: "\uC544\uBC84\uC9C0", romanization: "abeoji", chinese: "\u7238\u7238", level: "1", topic: "\u4EBA\u7269\u5173\u7CFB" },
      { korean: "\uC5B4\uBA38\uB2C8", romanization: "eomeoni", chinese: "\u5988\u5988", level: "1", topic: "\u4EBA\u7269\u5173\u7CFB" },
      { korean: "\uD560\uC544\uBC84\uC9C0", romanization: "harabeoji", chinese: "\u7237\u7237", level: "1", topic: "\u4EBA\u7269\u5173\u7CFB" },
      { korean: "\uCE5C\uAD6C", romanization: "chingu", chinese: "\u670B\u53CB", level: "1", topic: "\u4EBA\u7269\u5173\u7CFB" },
      { korean: "\uB3D9\uC0DD", romanization: "dongsaeng", chinese: "\u5F1F/\u59B9", level: "1", topic: "\u4EBA\u7269\u5173\u7CFB" },
      { korean: "\uC120\uC0DD\uB2D8", romanization: "seonsaengnim", chinese: "\u8001\u5E08", level: "1", topic: "\u4EBA\u7269\u5173\u7CFB" },
      { korean: "\uC774\uC6C3", romanization: "iut", chinese: "\u90BB\u5C45", level: "2", topic: "\u4EBA\u7269\u5173\u7CFB" }
    ]
  },
  {
    topic: "\u8EAB\u4F53\u90E8\u4F4D",
    words: [
      { korean: "\uBA38\uB9AC", romanization: "meori", chinese: "\u5934", level: "1", topic: "\u8EAB\u4F53\u90E8\u4F4D" },
      { korean: "\uB208", romanization: "nun", chinese: "\u773C\u775B", level: "1", topic: "\u8EAB\u4F53\u90E8\u4F4D" },
      { korean: "\uC190", romanization: "son", chinese: "\u624B", level: "1", topic: "\u8EAB\u4F53\u90E8\u4F4D" },
      { korean: "\uBC1C", romanization: "bal", chinese: "\u811A", level: "1", topic: "\u8EAB\u4F53\u90E8\u4F4D" },
      { korean: "\uBC30", romanization: "bae", chinese: "\u809A\u5B50", level: "1", topic: "\u8EAB\u4F53\u90E8\u4F4D" },
      { korean: "\uC785", romanization: "ip", chinese: "\u5634", level: "1", topic: "\u8EAB\u4F53\u90E8\u4F4D" },
      { korean: "\uADC0", romanization: "gwi", chinese: "\u8033\u6735", level: "1", topic: "\u8EAB\u4F53\u90E8\u4F4D" },
      { korean: "\uC2EC\uC7A5", romanization: "simjang", chinese: "\u5FC3\u810F", level: "3", topic: "\u8EAB\u4F53\u90E8\u4F4D" }
    ]
  },
  {
    topic: "\u98DF\u7269\u996E\u6599",
    words: [
      { korean: "\uBC25", romanization: "bap", chinese: "\u996D", level: "1", topic: "\u98DF\u7269\u996E\u6599" },
      { korean: "\uAD6D", romanization: "guk", chinese: "\u6C64", level: "1", topic: "\u98DF\u7269\u996E\u6599" },
      { korean: "\uAE40\uCE58", romanization: "kimchi", chinese: "\u6CE1\u83DC", level: "1", topic: "\u98DF\u7269\u996E\u6599" },
      { korean: "\uBB3C", romanization: "mul", chinese: "\u6C34", level: "1", topic: "\u98DF\u7269\u996E\u6599" },
      { korean: "\uCEE4\uD53C", romanization: "keopi", chinese: "\u5496\u5561", level: "1", topic: "\u98DF\u7269\u996E\u6599" },
      { korean: "\uC6B0\uC720", romanization: "uyu", chinese: "\u725B\u5976", level: "1", topic: "\u98DF\u7269\u996E\u6599" },
      { korean: "\uBE75", romanization: "ppang", chinese: "\u9762\u5305", level: "1", topic: "\u98DF\u7269\u996E\u6599" },
      { korean: "\uB77C\uBA74", romanization: "ramyeon", chinese: "\u62C9\u9762", level: "1", topic: "\u98DF\u7269\u996E\u6599" }
    ]
  },
  {
    topic: "\u6C34\u679C\u852C\u83DC",
    words: [
      { korean: "\uC0AC\uACFC", romanization: "sagwa", chinese: "\u82F9\u679C", level: "1", topic: "\u6C34\u679C\u852C\u83DC" },
      { korean: "\uBC14\uB098\uB098", romanization: "banana", chinese: "\u9999\u8549", level: "1", topic: "\u6C34\u679C\u852C\u83DC" },
      { korean: "\uD3EC\uB3C4", romanization: "podo", chinese: "\u8461\u8404", level: "1", topic: "\u6C34\u679C\u852C\u83DC" },
      { korean: "\uD1A0\uB9C8\uD1A0", romanization: "tomato", chinese: "\u756A\u8304", level: "1", topic: "\u6C34\u679C\u852C\u83DC" },
      { korean: "\uAC10\uC790", romanization: "gamja", chinese: "\u571F\u8C46", level: "1", topic: "\u6C34\u679C\u852C\u83DC" },
      { korean: "\uBC30\uCD94", romanization: "baechu", chinese: "\u767D\u83DC", level: "2", topic: "\u6C34\u679C\u852C\u83DC" }
    ]
  },
  {
    topic: "\u9910\u5385\u70B9\u9910",
    words: [
      { korean: "\uC8FC\uBB38", romanization: "jumun", chinese: "\u70B9\u9910", level: "2", topic: "\u9910\u5385\u70B9\u9910" },
      { korean: "\uBA54\uB274", romanization: "menyu", chinese: "\u83DC\u5355", level: "1", topic: "\u9910\u5385\u70B9\u9910" },
      { korean: "\uACC4\uC0B0\uC11C", romanization: "gyesanseo", chinese: "\u8D26\u5355", level: "2", topic: "\u9910\u5385\u70B9\u9910" },
      { korean: "\uB9DB\uC788\uAC8C", romanization: "masitge", chinese: "\u597D\u5403\u5730", level: "1", topic: "\u9910\u5385\u70B9\u9910" },
      { korean: "\uD544\uC694", romanization: "piryo", chinese: "\u9700\u8981", level: "1", topic: "\u9910\u5385\u70B9\u9910" },
      { korean: "\uCD94\uCC9C", romanization: "chucheon", chinese: "\u63A8\u8350", level: "2", topic: "\u9910\u5385\u70B9\u9910" }
    ]
  },
  {
    topic: "\u8D2D\u7269\u6D88\u8D39",
    words: [
      { korean: "\uC1FC\uD551", romanization: "syoping", chinese: "\u8D2D\u7269", level: "1", topic: "\u8D2D\u7269\u6D88\u8D39" },
      { korean: "\uAC00\uACA9", romanization: "gagyeok", chinese: "\u4EF7\u683C", level: "2", topic: "\u8D2D\u7269\u6D88\u8D39" },
      { korean: "\uD560\uC778", romanization: "harin", chinese: "\u6253\u6298", level: "2", topic: "\u8D2D\u7269\u6D88\u8D39" },
      { korean: "\uCE74\uB4DC", romanization: "kadeu", chinese: "\u5361", level: "1", topic: "\u8D2D\u7269\u6D88\u8D39" },
      { korean: "\uD604\uAE08", romanization: "hyeongeum", chinese: "\u73B0\u91D1", level: "2", topic: "\u8D2D\u7269\u6D88\u8D39" },
      { korean: "\uC601\uC218\uC99D", romanization: "yeongsujeung", chinese: "\u6536\u636E", level: "3", topic: "\u8D2D\u7269\u6D88\u8D39" }
    ]
  },
  {
    topic: "\u4EA4\u901A\u51FA\u884C",
    words: [
      { korean: "\uBC84\uC2A4", romanization: "beoseu", chinese: "\u516C\u4EA4", level: "1", topic: "\u4EA4\u901A\u51FA\u884C" },
      { korean: "\uC9C0\uD558\uCCA0", romanization: "jihacheol", chinese: "\u5730\u94C1", level: "1", topic: "\u4EA4\u901A\u51FA\u884C" },
      { korean: "\uD0DD\uC2DC", romanization: "taeksi", chinese: "\u51FA\u79DF\u8F66", level: "1", topic: "\u4EA4\u901A\u51FA\u884C" },
      { korean: "\uAE30\uCC28", romanization: "gicha", chinese: "\u706B\u8F66", level: "1", topic: "\u4EA4\u901A\u51FA\u884C" },
      { korean: "\uACF5\uD56D", romanization: "gonghang", chinese: "\u673A\u573A", level: "2", topic: "\u4EA4\u901A\u51FA\u884C" },
      { korean: "\uAE38", romanization: "gil", chinese: "\u8DEF", level: "1", topic: "\u4EA4\u901A\u51FA\u884C" }
    ]
  },
  {
    topic: "\u65F6\u95F4\u65E5\u671F",
    words: [
      { korean: "\uC624\uB298", romanization: "oneul", chinese: "\u4ECA\u5929", level: "1", topic: "\u65F6\u95F4\u65E5\u671F" },
      { korean: "\uB0B4\uC77C", romanization: "naeil", chinese: "\u660E\u5929", level: "1", topic: "\u65F6\u95F4\u65E5\u671F" },
      { korean: "\uC5B4\uC81C", romanization: "eoje", chinese: "\u6628\u5929", level: "1", topic: "\u65F6\u95F4\u65E5\u671F" },
      { korean: "\uC2DC\uAC04", romanization: "sigan", chinese: "\u65F6\u95F4", level: "1", topic: "\u65F6\u95F4\u65E5\u671F" },
      { korean: "\uC8FC\uB9D0", romanization: "jumal", chinese: "\u5468\u672B", level: "1", topic: "\u65F6\u95F4\u65E5\u671F" },
      { korean: "\uBD84", romanization: "bun", chinese: "\u5206\u949F", level: "1", topic: "\u65F6\u95F4\u65E5\u671F" }
    ]
  },
  {
    topic: "\u5929\u6C14\u5B63\u8282",
    words: [
      { korean: "\uB0A0\uC528", romanization: "nalssi", chinese: "\u5929\u6C14", level: "1", topic: "\u5929\u6C14\u5B63\u8282" },
      { korean: "\uBE44", romanization: "bi", chinese: "\u96E8", level: "1", topic: "\u5929\u6C14\u5B63\u8282" },
      { korean: "\uB208", romanization: "nun", chinese: "\u96EA", level: "1", topic: "\u5929\u6C14\u5B63\u8282" },
      { korean: "\uBD04", romanization: "bom", chinese: "\u6625", level: "1", topic: "\u5929\u6C14\u5B63\u8282" },
      { korean: "\uC5EC\uB984", romanization: "yeoreum", chinese: "\u590F", level: "1", topic: "\u5929\u6C14\u5B63\u8282" },
      { korean: "\uACA8\uC6B8", romanization: "gyeoul", chinese: "\u51AC", level: "1", topic: "\u5929\u6C14\u5B63\u8282" }
    ]
  },
  {
    topic: "\u989C\u8272\u5F62\u72B6",
    words: [
      { korean: "\uBE68\uAC04\uC0C9", romanization: "ppalgansaek", chinese: "\u7EA2\u8272", level: "1", topic: "\u989C\u8272\u5F62\u72B6" },
      { korean: "\uD30C\uB780\uC0C9", romanization: "paransaek", chinese: "\u84DD\u8272", level: "1", topic: "\u989C\u8272\u5F62\u72B6" },
      { korean: "\uB178\uB780\uC0C9", romanization: "noransaek", chinese: "\u9EC4\u8272", level: "1", topic: "\u989C\u8272\u5F62\u72B6" },
      { korean: "\uD558\uC580\uC0C9", romanization: "hayansek", chinese: "\u767D\u8272", level: "1", topic: "\u989C\u8272\u5F62\u72B6" },
      { korean: "\uB3D9\uADF8\uB77C\uBBF8", romanization: "dong geurami", chinese: "\u5706\u5F62", level: "2", topic: "\u989C\u8272\u5F62\u72B6" },
      { korean: "\uB124\uBAA8", romanization: "nemo", chinese: "\u65B9\u5F62", level: "2", topic: "\u989C\u8272\u5F62\u72B6" }
    ]
  },
  {
    topic: "\u5B66\u6821\u5B66\u4E60",
    words: [
      { korean: "\uD559\uAD50", romanization: "hakgyo", chinese: "\u5B66\u6821", level: "1", topic: "\u5B66\u6821\u5B66\u4E60" },
      { korean: "\uACF5\uBD80", romanization: "gongbu", chinese: "\u5B66\u4E60", level: "1", topic: "\u5B66\u6821\u5B66\u4E60" },
      { korean: "\uC2DC\uD5D8", romanization: "siheom", chinese: "\u8003\u8BD5", level: "1", topic: "\u5B66\u6821\u5B66\u4E60" },
      { korean: "\uC219\uC81C", romanization: "sukje", chinese: "\u4F5C\u4E1A", level: "1", topic: "\u5B66\u6821\u5B66\u4E60" },
      { korean: "\uB3C4\uC11C\uAD00", romanization: "doseogwan", chinese: "\u56FE\u4E66\u9986", level: "2", topic: "\u5B66\u6821\u5B66\u4E60" },
      { korean: "\uC5F0\uC2B5", romanization: "yeonseup", chinese: "\u7EC3\u4E60", level: "1", topic: "\u5B66\u6821\u5B66\u4E60" }
    ]
  },
  {
    topic: "\u804C\u573A\u529E\u516C",
    words: [
      { korean: "\uD68C\uC0AC", romanization: "hoesa", chinese: "\u516C\u53F8", level: "1", topic: "\u804C\u573A\u529E\u516C" },
      { korean: "\uD68C\uC758", romanization: "hoei", chinese: "\u4F1A\u8BAE", level: "2", topic: "\u804C\u573A\u529E\u516C" },
      { korean: "\uC77C", romanization: "il", chinese: "\u5DE5\u4F5C", level: "1", topic: "\u804C\u573A\u529E\u516C" },
      { korean: "\uC0C1\uC0AC", romanization: "sangsa", chinese: "\u4E0A\u53F8", level: "3", topic: "\u804C\u573A\u529E\u516C" },
      { korean: "\uB3D9\uB8CC", romanization: "dongnyo", chinese: "\u540C\u4E8B", level: "3", topic: "\u804C\u573A\u529E\u516C" },
      { korean: "\uD504\uB85C\uC81D\uD2B8", romanization: "peurojekteu", chinese: "\u9879\u76EE", level: "3", topic: "\u804C\u573A\u529E\u516C" }
    ]
  },
  {
    topic: "\u533B\u9662\u5C31\u8BCA",
    words: [
      { korean: "\uBCD1\uC6D0", romanization: "byeongwon", chinese: "\u533B\u9662", level: "1", topic: "\u533B\u9662\u5C31\u8BCA" },
      { korean: "\uC57D", romanization: "yak", chinese: "\u836F", level: "1", topic: "\u533B\u9662\u5C31\u8BCA" },
      { korean: "\uC544\uD504\uB2E4", romanization: "apeuda", chinese: "\u75BC", level: "1", topic: "\u533B\u9662\u5C31\u8BCA" },
      { korean: "\uC758\uC0AC", romanization: "uisa", chinese: "\u533B\u751F", level: "2", topic: "\u533B\u9662\u5C31\u8BCA" },
      { korean: "\uC608\uC57D", romanization: "yeyak", chinese: "\u9884\u7EA6", level: "2", topic: "\u533B\u9662\u5C31\u8BCA" },
      { korean: "\uCE58\uB8CC", romanization: "chiryo", chinese: "\u6CBB\u7597", level: "3", topic: "\u533B\u9662\u5C31\u8BCA" }
    ]
  },
  {
    topic: "\u65C5\u6E38\u51FA\u884C",
    words: [
      { korean: "\uC5EC\uD589", romanization: "yeohaeng", chinese: "\u65C5\u884C", level: "1", topic: "\u65C5\u6E38\u51FA\u884C" },
      { korean: "\uD638\uD154", romanization: "hotel", chinese: "\u9152\u5E97", level: "1", topic: "\u65C5\u6E38\u51FA\u884C" },
      { korean: "\uAD00\uAD11", romanization: "gwangwang", chinese: "\u89C2\u5149", level: "2", topic: "\u65C5\u6E38\u51FA\u884C" },
      { korean: "\uC9C0\uB3C4", romanization: "jido", chinese: "\u5730\u56FE", level: "2", topic: "\u65C5\u6E38\u51FA\u884C" },
      { korean: "\uAE30\uB150\uD488", romanization: "ginyeompum", chinese: "\u7EAA\u5FF5\u54C1", level: "3", topic: "\u65C5\u6E38\u51FA\u884C" },
      { korean: "\uC5EC\uAD8C", romanization: "yeogwon", chinese: "\u62A4\u7167", level: "2", topic: "\u65C5\u6E38\u51FA\u884C" }
    ]
  },
  {
    topic: "\u60C5\u611F\u8868\u8FBE",
    words: [
      { korean: "\uAE30\uC058\uB2E4", romanization: "gippeuda", chinese: "\u9AD8\u5174", level: "1", topic: "\u60C5\u611F\u8868\u8FBE" },
      { korean: "\uC2AC\uD504\uB2E4", romanization: "seulpeuda", chinese: "\u60B2\u4F24", level: "2", topic: "\u60C5\u611F\u8868\u8FBE" },
      { korean: "\uD654\uB098\uB2E4", romanization: "hwanada", chinese: "\u751F\u6C14", level: "2", topic: "\u60C5\u611F\u8868\u8FBE" },
      { korean: "\uC0AC\uB791", romanization: "sarang", chinese: "\u7231", level: "1", topic: "\u60C5\u611F\u8868\u8FBE" },
      { korean: "\uBBF8\uC548", romanization: "mian", chinese: "\u62B1\u6B49", level: "1", topic: "\u60C5\u611F\u8868\u8FBE" },
      { korean: "\uAC10\uC0AC", romanization: "gamsa", chinese: "\u611F\u8C22", level: "1", topic: "\u60C5\u611F\u8868\u8FBE" }
    ]
  },
  {
    topic: "\u5174\u8DA3\u7231\u597D",
    words: [
      { korean: "\uCDE8\uBBF8", romanization: "chwimi", chinese: "\u7231\u597D", level: "1", topic: "\u5174\u8DA3\u7231\u597D" },
      { korean: "\uC74C\uC545", romanization: "eumak", chinese: "\u97F3\u4E50", level: "1", topic: "\u5174\u8DA3\u7231\u597D" },
      { korean: "\uC6B4\uB3D9", romanization: "undong", chinese: "\u8FD0\u52A8", level: "1", topic: "\u5174\u8DA3\u7231\u597D" },
      { korean: "\uC601\uD654", romanization: "yeonghwa", chinese: "\u7535\u5F71", level: "1", topic: "\u5174\u8DA3\u7231\u597D" },
      { korean: "\uB3C5\uC11C", romanization: "dokseo", chinese: "\u8BFB\u4E66", level: "2", topic: "\u5174\u8DA3\u7231\u597D" },
      { korean: "\uADF8\uB9BC", romanization: "geurim", chinese: "\u753B", level: "1", topic: "\u5174\u8DA3\u7231\u597D" }
    ]
  },
  {
    topic: "\u5BB6\u5C45\u7528\u54C1",
    words: [
      { korean: "\uCE68\uB300", romanization: "chimdae", chinese: "\u5E8A", level: "1", topic: "\u5BB6\u5C45\u7528\u54C1" },
      { korean: "\uC18C\uD30C", romanization: "sopa", chinese: "\u6C99\u53D1", level: "1", topic: "\u5BB6\u5C45\u7528\u54C1" },
      { korean: "\uCC45\uC0C1", romanization: "chaeksang", chinese: "\u4E66\u684C", level: "1", topic: "\u5BB6\u5C45\u7528\u54C1" },
      { korean: "\uB0C9\uC7A5\uACE0", romanization: "naengjanggo", chinese: "\u51B0\u7BB1", level: "1", topic: "\u5BB6\u5C45\u7528\u54C1" },
      { korean: "\uCC3D\uBB38", romanization: "changmun", chinese: "\u7A97\u6237", level: "2", topic: "\u5BB6\u5C45\u7528\u54C1" },
      { korean: "\uAC70\uC6B8", romanization: "geoul", chinese: "\u955C\u5B50", level: "2", topic: "\u5BB6\u5C45\u7528\u54C1" }
    ]
  },
  {
    topic: "\u7535\u5B50\u4EA7\u54C1",
    words: [
      { korean: "\uD578\uB4DC\uD3F0", romanization: "haendeupon", chinese: "\u624B\u673A", level: "1", topic: "\u7535\u5B50\u4EA7\u54C1" },
      { korean: "\uCEF4\uD4E8\uD130", romanization: "keompyuteo", chinese: "\u7535\u8111", level: "1", topic: "\u7535\u5B50\u4EA7\u54C1" },
      { korean: "\uC774\uC5B4\uD3F0", romanization: "ieophon", chinese: "\u8033\u673A", level: "2", topic: "\u7535\u5B50\u4EA7\u54C1" },
      { korean: "\uCDA9\uC804\uAE30", romanization: "chungjeongi", chinese: "\u5145\u7535\u5668", level: "2", topic: "\u7535\u5B50\u4EA7\u54C1" },
      { korean: "\uCE74\uBA54\uB77C", romanization: "kamera", chinese: "\u76F8\u673A", level: "2", topic: "\u7535\u5B50\u4EA7\u54C1" },
      { korean: "\uBC30\uD130\uB9AC", romanization: "baeteori", chinese: "\u7535\u6C60", level: "3", topic: "\u7535\u5B50\u4EA7\u54C1" }
    ]
  },
  {
    topic: "\u52A8\u7269\u690D\u7269",
    words: [
      { korean: "\uAC15\uC544\uC9C0", romanization: "gangaji", chinese: "\u5C0F\u72D7", level: "1", topic: "\u52A8\u7269\u690D\u7269" },
      { korean: "\uACE0\uC591\uC774", romanization: "goyangi", chinese: "\u732B", level: "1", topic: "\u52A8\u7269\u690D\u7269" },
      { korean: "\uAF43", romanization: "kkot", chinese: "\u82B1", level: "1", topic: "\u52A8\u7269\u690D\u7269" },
      { korean: "\uB098\uBB34", romanization: "namu", chinese: "\u6811", level: "1", topic: "\u52A8\u7269\u690D\u7269" },
      { korean: "\uC0C8", romanization: "sae", chinese: "\u9E1F", level: "1", topic: "\u52A8\u7269\u690D\u7269" },
      { korean: "\uBB3C\uACE0\uAE30", romanization: "mulgogi", chinese: "\u9C7C", level: "2", topic: "\u52A8\u7269\u690D\u7269" }
    ]
  },
  {
    topic: "\u6570\u5B57\u5EA6\u91CF",
    words: [
      { korean: "\uD558\uB098", romanization: "hana", chinese: "\u4E00", level: "1", topic: "\u6570\u5B57\u5EA6\u91CF" },
      { korean: "\uB458", romanization: "dul", chinese: "\u4E8C", level: "1", topic: "\u6570\u5B57\u5EA6\u91CF" },
      { korean: "\uC14B", romanization: "set", chinese: "\u4E09", level: "1", topic: "\u6570\u5B57\u5EA6\u91CF" },
      { korean: "\uC5F4", romanization: "yeol", chinese: "\u5341", level: "1", topic: "\u6570\u5B57\u5EA6\u91CF" },
      { korean: "\uBC31", romanization: "baek", chinese: "\u767E", level: "2", topic: "\u6570\u5B57\u5EA6\u91CF" },
      { korean: "\uD37C\uC13C\uD2B8", romanization: "peosenteu", chinese: "\u767E\u5206\u6BD4", level: "3", topic: "\u6570\u5B57\u5EA6\u91CF" }
    ]
  },
  {
    topic: "\u8863\u7269\u978B\u5E3D",
    words: [
      { korean: "\uC637", romanization: "ot", chinese: "\u8863\u670D", level: "1", topic: "\u8863\u7269\u978B\u5E3D" },
      { korean: "\uBAA8\uC790", romanization: "moja", chinese: "\u5E3D\u5B50", level: "1", topic: "\u8863\u7269\u978B\u5E3D" },
      { korean: "\uC2E0\uBC1C", romanization: "sinbal", chinese: "\u978B", level: "1", topic: "\u8863\u7269\u978B\u5E3D" },
      { korean: "\uBC14\uC9C0", romanization: "baji", chinese: "\u88E4\u5B50", level: "1", topic: "\u8863\u7269\u978B\u5E3D" },
      { korean: "\uCF54\uD2B8", romanization: "koteu", chinese: "\u5927\u8863", level: "2", topic: "\u8863\u7269\u978B\u5E3D" },
      { korean: "\uC591\uB9D0", romanization: "yangmal", chinese: "\u889C\u5B50", level: "1", topic: "\u8863\u7269\u978B\u5E3D" }
    ]
  },
  {
    topic: "\u8FD0\u52A8\u5065\u8EAB",
    words: [
      { korean: "\uCD95\uAD6C", romanization: "chukgu", chinese: "\u8DB3\u7403", level: "1", topic: "\u8FD0\u52A8\u5065\u8EAB" },
      { korean: "\uC218\uC601", romanization: "suyeong", chinese: "\u6E38\u6CF3", level: "1", topic: "\u8FD0\u52A8\u5065\u8EAB" },
      { korean: "\uD5EC\uC2A4", romanization: "helseu", chinese: "\u5065\u8EAB", level: "2", topic: "\u8FD0\u52A8\u5065\u8EAB" },
      { korean: "\uC694\uAC00", romanization: "yoga", chinese: "\u745C\u4F3D", level: "2", topic: "\u8FD0\u52A8\u5065\u8EAB" },
      { korean: "\uB2EC\uB9AC\uAE30", romanization: "dalligi", chinese: "\u8DD1\u6B65", level: "2", topic: "\u8FD0\u52A8\u5065\u8EAB" },
      { korean: "\uACBD\uAE30", romanization: "gyeonggi", chinese: "\u6BD4\u8D5B", level: "3", topic: "\u8FD0\u52A8\u5065\u8EAB" }
    ]
  },
  {
    topic: "\u7F8E\u5986\u62A4\u80A4",
    words: [
      { korean: "\uD654\uC7A5\uD488", romanization: "hwajangpum", chinese: "\u5316\u5986\u54C1", level: "2", topic: "\u7F8E\u5986\u62A4\u80A4" },
      { korean: "\uD06C\uB9BC", romanization: "keurim", chinese: "\u9762\u971C", level: "2", topic: "\u7F8E\u5986\u62A4\u80A4" },
      { korean: "\uD5A5\uC218", romanization: "hyangsu", chinese: "\u9999\u6C34", level: "3", topic: "\u7F8E\u5986\u62A4\u80A4" },
      { korean: "\uD53C\uBD80", romanization: "pibu", chinese: "\u76AE\u80A4", level: "3", topic: "\u7F8E\u5986\u62A4\u80A4" },
      { korean: "\uB85C\uC158", romanization: "rosyeon", chinese: "\u4E73\u6DB2", level: "2", topic: "\u7F8E\u5986\u62A4\u80A4" }
    ]
  },
  {
    topic: "\u97E9\u6D41\u5A31\u4E50",
    words: [
      { korean: "\uC544\uC774\uB3CC", romanization: "aidol", chinese: "\u5076\u50CF", level: "2", topic: "\u97E9\u6D41\u5A31\u4E50" },
      { korean: "\uCF58\uC11C\uD2B8", romanization: "konseoteu", chinese: "\u6F14\u5531\u4F1A", level: "2", topic: "\u97E9\u6D41\u5A31\u4E50" },
      { korean: "\uB4DC\uB77C\uB9C8", romanization: "deurama", chinese: "\u7535\u89C6\u5267", level: "1", topic: "\u97E9\u6D41\u5A31\u4E50" },
      { korean: "\uB178\uB798", romanization: "norae", chinese: "\u6B4C", level: "1", topic: "\u97E9\u6D41\u5A31\u4E50" },
      { korean: "\uD32C", romanization: "paen", chinese: "\u7C89\u4E1D", level: "2", topic: "\u97E9\u6D41\u5A31\u4E50" },
      { korean: "\uBB34\uB300", romanization: "mudae", chinese: "\u821E\u53F0", level: "3", topic: "\u97E9\u6D41\u5A31\u4E50" }
    ]
  },
  {
    topic: "\u8282\u65E5\u5E86\u5178",
    words: [
      { korean: "\uC124\uB0A0", romanization: "seollal", chinese: "\u6625\u8282", level: "2", topic: "\u8282\u65E5\u5E86\u5178" },
      { korean: "\uCD94\uC11D", romanization: "chuseok", chinese: "\u4E2D\u79CB", level: "2", topic: "\u8282\u65E5\u5E86\u5178" },
      { korean: "\uC0DD\uC77C", romanization: "saengil", chinese: "\u751F\u65E5", level: "1", topic: "\u8282\u65E5\u5E86\u5178" },
      { korean: "\uC120\uBB3C", romanization: "seonmul", chinese: "\u793C\u7269", level: "1", topic: "\u8282\u65E5\u5E86\u5178" },
      { korean: "\uD30C\uD2F0", romanization: "pati", chinese: "\u6D3E\u5BF9", level: "2", topic: "\u8282\u65E5\u5E86\u5178" }
    ]
  },
  {
    topic: "\u516C\u5171\u573A\u6240",
    words: [
      { korean: "\uC740\uD589", romanization: "eunhaeng", chinese: "\u94F6\u884C", level: "2", topic: "\u516C\u5171\u573A\u6240" },
      { korean: "\uC6B0\uCCB4\uAD6D", romanization: "ucheguk", chinese: "\u90AE\u5C40", level: "2", topic: "\u516C\u5171\u573A\u6240" },
      { korean: "\uACF5\uC6D0", romanization: "gongwon", chinese: "\u516C\u56ED", level: "1", topic: "\u516C\u5171\u573A\u6240" },
      { korean: "\uC2DC\uC7A5", romanization: "sijang", chinese: "\u5E02\u573A", level: "1", topic: "\u516C\u5171\u573A\u6240" },
      { korean: "\uACBD\uCC30\uC11C", romanization: "gyeongchalseo", chinese: "\u8B66\u5BDF\u5C40", level: "3", topic: "\u516C\u5171\u573A\u6240" }
    ]
  },
  {
    topic: "\u65B9\u4F4D\u65B9\u5411",
    words: [
      { korean: "\uC55E", romanization: "ap", chinese: "\u524D", level: "1", topic: "\u65B9\u4F4D\u65B9\u5411" },
      { korean: "\uB4A4", romanization: "dwi", chinese: "\u540E", level: "1", topic: "\u65B9\u4F4D\u65B9\u5411" },
      { korean: "\uC67C\uCABD", romanization: "oenjjok", chinese: "\u5DE6", level: "1", topic: "\u65B9\u4F4D\u65B9\u5411" },
      { korean: "\uC624\uB978\uCABD", romanization: "oreunjjok", chinese: "\u53F3", level: "1", topic: "\u65B9\u4F4D\u65B9\u5411" },
      { korean: "\uC704", romanization: "wi", chinese: "\u4E0A", level: "1", topic: "\u65B9\u4F4D\u65B9\u5411" },
      { korean: "\uC544\uB798", romanization: "arae", chinese: "\u4E0B", level: "1", topic: "\u65B9\u4F4D\u65B9\u5411" }
    ]
  },
  {
    topic: "\u53A8\u623F\u7528\u54C1",
    words: [
      { korean: "\uB0C4\uBE44", romanization: "naembi", chinese: "\u9505", level: "2", topic: "\u53A8\u623F\u7528\u54C1" },
      { korean: "\uC811\uC2DC", romanization: "jeopsi", chinese: "\u76D8\u5B50", level: "2", topic: "\u53A8\u623F\u7528\u54C1" },
      { korean: "\uC21F\uAC00\uB77D", romanization: "sutgarak", chinese: "\u52FA\u5B50", level: "1", topic: "\u53A8\u623F\u7528\u54C1" },
      { korean: "\uC813\uAC00\uB77D", romanization: "jeotgarak", chinese: "\u7B77\u5B50", level: "1", topic: "\u53A8\u623F\u7528\u54C1" },
      { korean: "\uCE7C", romanization: "kal", chinese: "\u5200", level: "2", topic: "\u53A8\u623F\u7528\u54C1" }
    ]
  },
  {
    topic: "\u94F6\u884C\u90AE\u5C40",
    words: [
      { korean: "\uACC4\uC88C", romanization: "gyejwa", chinese: "\u8D26\u6237", level: "3", topic: "\u94F6\u884C\u90AE\u5C40" },
      { korean: "\uC1A1\uAE08", romanization: "songgeum", chinese: "\u6C47\u6B3E", level: "3", topic: "\u94F6\u884C\u90AE\u5C40" },
      { korean: "\uC6B0\uD45C", romanization: "upyo", chinese: "\u90AE\u7968", level: "2", topic: "\u94F6\u884C\u90AE\u5C40" },
      { korean: "\uC18C\uD3EC", romanization: "sopo", chinese: "\u5305\u88F9", level: "3", topic: "\u94F6\u884C\u90AE\u5C40" }
    ]
  },
  {
    topic: "\u5BA0\u7269\u5E97",
    words: [
      { korean: "\uAC04\uC2DD", romanization: "gansik", chinese: "\u96F6\u98DF", level: "1", topic: "\u5BA0\u7269\u5E97" },
      { korean: "\uBAA9\uC695", romanization: "mogyok", chinese: "\u6D17\u6FA1", level: "2", topic: "\u5BA0\u7269\u5E97" },
      { korean: "\uBCD1\uC6D0", romanization: "byeongwon", chinese: "\u533B\u9662", level: "1", topic: "\u5BA0\u7269\u5E97" }
    ]
  },
  {
    topic: "\u4FBF\u5229\u5E97",
    words: [
      { korean: "\uD3B8\uC758\uC810", romanization: "pyeonuijeom", chinese: "\u4FBF\u5229\u5E97", level: "2", topic: "\u4FBF\u5229\u5E97" },
      { korean: "\uB2F4\uBC30", romanization: "dambae", chinese: "\u70DF", level: "3", topic: "\u4FBF\u5229\u5E97" },
      { korean: "\uC74C\uB8CC\uC218", romanization: "eumnyosu", chinese: "\u996E\u6599", level: "1", topic: "\u4FBF\u5229\u5E97" }
    ]
  }
];

// src/data/dialogue.ts
var DIALOGUES = [
  {
    scene: "\u9910\u5385\u70B9\u9910",
    icon: "\u{1F37D}\uFE0F",
    lines: [
      { speaker: "A", ko: "\uC5B4\uC11C \uC624\uC138\uC694. \uBA87 \uBD84\uC774\uC138\uC694?", roman: "eoseo oseyo. myeot buniseyo?", zh: "\u6B22\u8FCE\u5149\u4E34\u3002\u51E0\u4F4D\uFF1F" },
      { speaker: "B", ko: "\uB450 \uBA85\uC774\uC694.", roman: "du myeong-iyo", zh: "\u4E24\u4F4D\u3002" },
      { speaker: "A", ko: "\uC774\uCABD\uC73C\uB85C \uC549\uC73C\uC138\uC694.", roman: "i-jjogeuro anjeuseyo", zh: "\u8BF7\u5750\u8FD9\u8FB9\u3002" },
      { speaker: "B", ko: "\uBA54\uB274 \uC880 \uC8FC\uC138\uC694.", roman: "menyu jom juseyo", zh: "\u8BF7\u7ED9\u6211\u83DC\u5355\u3002" },
      { speaker: "A", ko: "\uBB50 \uB4DC\uB9B4\uAE4C\uC694?", roman: "mwo deurilkkayo?", zh: "\u60A8\u70B9\u4EC0\u4E48\uFF1F" },
      { speaker: "B", ko: "\uBD88\uACE0\uAE30 \uD558\uB098\uB791 \uBC25 \uC8FC\uC138\uC694.", roman: "bulgogi hanarang bap juseyo", zh: "\u8BF7\u6765\u4E00\u4EFD\u70E4\u8089\u548C\u996D\u3002" }
    ],
    vocabulary: [
      { word: "\uC5B4\uC11C \uC624\uC138\uC694", zh: "\u6B22\u8FCE\u5149\u4E34" },
      { word: "\uBA87 \uBD84", zh: "\u51E0\u4F4D" },
      { word: "\uBA54\uB274", zh: "\u83DC\u5355" },
      { word: "\uBD88\uACE0\uAE30", zh: "\u70E4\u8089" }
    ],
    grammar: ["-(\uC73C)\uC138\uC694\uFF08\u8BF7\u2026\u2026\uFF09", "-\uB791\uFF08\u548C\uFF09", "\uC8FC\uC138\uC694\uFF08\u8BF7\u7ED9\uFF09"]
  },
  {
    scene: "\u5496\u5561\u5385",
    icon: "\u2615",
    lines: [
      { speaker: "A", ko: "\uC5B4\uC11C \uC624\uC138\uC694. \uBB34\uC5C7\uC744 \uB4DC\uB9B4\uAE4C\uC694?", roman: "eoseo oseyo. mueoseul deurilkkayo?", zh: "\u6B22\u8FCE\u3002\u60A8\u8981\u4EC0\u4E48\uFF1F" },
      { speaker: "B", ko: "\uC544\uBA54\uB9AC\uCE74\uB178 \uD55C \uC794\uC774\uC694.", roman: "amerikano han jan-iyo", zh: "\u4E00\u676F\u7F8E\u5F0F\u3002" },
      { speaker: "A", ko: "\uB530\uB73B\uD55C \uAC70\uB85C \uD560\uAE4C\uC694, \uCC28\uAC00\uC6B4 \uAC70\uB85C \uD560\uAE4C\uC694?", roman: "ttatteutan geolo halkkayo, chagaun geolo halkkayo?", zh: "\u8981\u70ED\u7684\u8FD8\u662F\u51B0\u7684\uFF1F" },
      { speaker: "B", ko: "\uB530\uB73B\uD55C \uAC78\uB85C \uC8FC\uC138\uC694.", roman: "ttatteutan geollo juseyo", zh: "\u8981\u70ED\u7684\u3002" },
      { speaker: "A", ko: "\uC5EC\uAE30 \uC549\uC73C\uC2E4\uB798\uC694?", roman: "yeogi anjeusillaeyo?", zh: "\u8981\u5750\u8FD9\u91CC\u5417\uFF1F" },
      { speaker: "B", ko: "\uB124, \uCC3D\uAC00 \uCABD\uC774\uC694.", roman: "ne, changga jjog-iyo", zh: "\u55EF\uFF0C\u9760\u7A97\u7684\u3002" }
    ],
    vocabulary: [
      { word: "\uC544\uBA54\uB9AC\uCE74\uB178", zh: "\u7F8E\u5F0F\u5496\u5561" },
      { word: "\uB530\uB73B\uD55C", zh: "\u70ED\u7684" },
      { word: "\uCC28\uAC00\uC6B4", zh: "\u51B0\u7684" },
      { word: "\uCC3D\uAC00", zh: "\u7A97\u8FB9" }
    ],
    grammar: ["-(\uC73C)\u3139\uAE4C\uC694?\uFF08\u8981\u4E0D\u8981\u2026\u2026\uFF09", "-\uB85C \uD560\uAE4C\uC694\uFF08\u7528\u2026\u2026\u5417\uFF09", "-\uC2E4\uB798\uC694?\uFF08\u60F3\u2026\u2026\u5417\uFF09"]
  },
  {
    scene: "\u95EE\u8DEF\u5BFC\u822A",
    icon: "\u{1F9ED}",
    lines: [
      { speaker: "B", ko: "\uC2E4\uB840\uD569\uB2C8\uB2E4, \uC9C0\uD558\uCCA0\uC5ED \uC5B4\uB5BB\uAC8C \uAC00\uC694?", roman: "sillyehamnida, jihacheolyeok eotteoke gayo?", zh: "\u6253\u6270\u4E0B\uFF0C\u5730\u94C1\u7AD9\u600E\u4E48\u8D70\uFF1F" },
      { speaker: "A", ko: "\uC800\uAE30 \uC0AC\uAC70\uB9AC\uC5D0\uC11C \uC624\uB978\uCABD\uC73C\uB85C \uAC00\uC138\uC694.", roman: "jeogi sageori-eseo oreunjjogeuro gaseyo", zh: "\u5728\u90A3\u4E2A\u5341\u5B57\u8DEF\u53E3\u5411\u53F3\u8D70\u3002" },
      { speaker: "B", ko: "\uBA40\uC5B4\uC694?", roman: "meoreoyo?", zh: "\u8FDC\u5417\uFF1F" },
      { speaker: "A", ko: "\uC544\uB2C8\uC694, \uAC78\uC5B4\uC11C 5\uBD84\uC774\uBA74 \uB3FC\uC694.", roman: "aniyo, georeoseo o-bun-imyeon dwaeyo", zh: "\u4E0D\u8FDC\uFF0C\u8D70\u8DEF5\u5206\u949F\u5C31\u5230\u3002" },
      { speaker: "B", ko: "\uAC10\uC0AC\uD569\uB2C8\uB2E4!", roman: "gamsahamnida", zh: "\u8C22\u8C22\uFF01" }
    ],
    vocabulary: [
      { word: "\uC2E4\uB840\uD569\uB2C8\uB2E4", zh: "\u6253\u6270\u4E86/\u4E0D\u597D\u610F\u601D" },
      { word: "\uC0AC\uAC70\uB9AC", zh: "\u5341\u5B57\u8DEF\u53E3" },
      { word: "\uC624\uB978\uCABD", zh: "\u53F3\u8FB9" },
      { word: "\uAC78\uC5B4\uC11C", zh: "\u8D70\u8DEF" }
    ],
    grammar: ["\uC5B4\uB5BB\uAC8C\uFF08\u600E\u4E48\uFF09", "-\uC5D0\uC11C\uFF08\u4ECE\uFF09", "-\uC73C\uB85C \uAC00\uC138\uC694\uFF08\u5411\u2026\u2026\u8D70\uFF09"]
  },
  {
    scene: "\u8D2D\u7269\u901B\u8857",
    icon: "\u{1F6CD}\uFE0F",
    lines: [
      { speaker: "B", ko: "\uC774 \uAC00\uBC29 \uC5BC\uB9C8\uC608\uC694?", roman: "i gabang eolmayeyo?", zh: "\u8FD9\u4E2A\u5305\u591A\u5C11\u94B1\uFF1F" },
      { speaker: "A", ko: "\uC0BC\uB9CC \uC6D0\uC774\uC5D0\uC694.", roman: "sam-man won-ieyo", zh: "\u4E09\u4E07\u97E9\u5143\u3002" },
      { speaker: "B", ko: "\uC870\uAE08 \uAE4E\uC744 \uC218 \uC788\uC5B4\uC694?", roman: "jogeum kkakkeul su isseoyo?", zh: "\u80FD\u4FBF\u5B9C\u70B9\u5417\uFF1F" },
      { speaker: "A", ko: "\uB124, \uC774\uB9CC \uC6D0\uB9CC \uC8FC\uC138\uC694.", roman: "ne, i-man wonman juseyo", zh: "\u53EF\u4EE5\uFF0C\u7ED9\u4E24\u4E07\u5427\u3002" },
      { speaker: "B", ko: "\uCE74\uB4DC \uB3FC\uC694?", roman: "kadeu dwaeyo?", zh: "\u80FD\u5237\u5361\u5417\uFF1F" },
      { speaker: "A", ko: "\uB124, \uB429\uB2C8\uB2E4.", roman: "ne, doemnida", zh: "\u53EF\u4EE5\u3002" }
    ],
    vocabulary: [
      { word: "\uAC00\uBC29", zh: "\u5305" },
      { word: "\uC5BC\uB9C8", zh: "\u591A\u5C11\uFF08\u94B1\uFF09" },
      { word: "\uAE4E\uB2E4", zh: "\u780D\u4EF7" },
      { word: "\uCE74\uB4DC", zh: "\u5361" }
    ],
    grammar: ["-\uC608\uC694/\uC774\uC5D0\uC694\uFF08\u662F\uFF09", "\uC5BC\uB9C8\uC608\uC694\uFF08\u591A\u5C11\u94B1\uFF09", "-\uC544/\uC5B4\uC694 \u7591\u95EE"]
  },
  {
    scene: "\u533B\u9662\u5C31\u8BCA",
    icon: "\u{1F3E5}",
    lines: [
      { speaker: "A", ko: "\uC5B4\uB514\uAC00 \uBD88\uD3B8\uD558\uC138\uC694?", roman: "eodiga bulpyeonhaseyo?", zh: "\u54EA\u91CC\u4E0D\u8212\u670D\uFF1F" },
      { speaker: "B", ko: "\uBA38\uB9AC\uAC00 \uC544\uD504\uACE0 \uC5F4\uC774 \uC788\uC5B4\uC694.", roman: "meoriga apeugo yeori isseoyo", zh: "\u5934\u75BC\uFF0C\u8FD8\u53D1\u70E7\u3002" },
      { speaker: "A", ko: "\uBA70\uCE60 \uC774\uB807\uAC8C \uC9C0\uB0C8\uC5B4\uC694?", roman: "myeoch-il ireoke jinaesseoyo?", zh: "\u8FD9\u6837\u51E0\u5929\u4E86\uFF1F" },
      { speaker: "B", ko: "\uC5B4\uC81C\uBD80\uD130\uC694.", roman: "eoje-buteoyo", zh: "\u4ECE\u6628\u5929\u5F00\u59CB\u3002" },
      { speaker: "A", ko: "\uC57D\uC744 \uB4DC\uB9AC\uACE0 \uC26C\uC138\uC694.", roman: "yageul deurigo swiseyo", zh: "\u5403\u836F\u4F11\u606F\u5427\u3002" }
    ],
    vocabulary: [
      { word: "\uBD88\uD3B8\uD558\uB2E4", zh: "\u4E0D\u8212\u670D" },
      { word: "\uBA38\uB9AC", zh: "\u5934" },
      { word: "\uC5F4", zh: "\u70E7" },
      { word: "\uC57D", zh: "\u836F" }
    ],
    grammar: ["-\uACE0\uFF08\u5E76\u4E14\uFF09", "-\uC544/\uC5B4\uC694\uFF08\u9648\u8FF0\uFF09", "\uBD80\uD130\uFF08\u4ECE\uFF09"]
  },
  {
    scene: "\u673A\u573A\u51FA\u5165\u5883",
    icon: "\u2708\uFE0F",
    lines: [
      { speaker: "A", ko: "\uC5EC\uAD8C \uBCF4\uC5EC\uC8FC\uC138\uC694.", roman: "yeogwon boyeojuseyo", zh: "\u8BF7\u51FA\u793A\u62A4\u7167\u3002" },
      { speaker: "B", ko: "\uC5EC\uAE30 \uC788\uC5B4\uC694.", roman: "yeogi isseoyo", zh: "\u5728\u8FD9\u91CC\u3002" },
      { speaker: "A", ko: "\uD55C\uAD6D\uC5D0 \uC5B8\uC81C\uAE4C\uC9C0 \uACC4\uC2E4 \uAC70\uC608\uC694?", roman: "hanguge eonjekkaji gyesil kkeoyeyo?", zh: "\u5728\u97E9\u56FD\u5F85\u5230\u4EC0\u4E48\u65F6\u5019\uFF1F" },
      { speaker: "B", ko: "\uC77C\uC8FC\uC77C \uB3D9\uC548 \uC788\uC744 \uAC70\uC608\uC694.", roman: "il-ju-il dongan isseul kkeoyeyo", zh: "\u4F1A\u5F85\u4E00\u5468\u3002" },
      { speaker: "A", ko: "\uC88B\uC544\uC694, \uD1B5\uACFC\uB418\uC168\uC2B5\uB2C8\uB2E4.", roman: "joayo, tong-gwa-doesyeot-seumnida", zh: "\u597D\u7684\uFF0C\u901A\u8FC7\u4E86\u3002" }
    ],
    vocabulary: [
      { word: "\uC5EC\uAD8C", zh: "\u62A4\u7167" },
      { word: "\uBCF4\uC5EC\uC8FC\uB2E4", zh: "\u7ED9\u770B" },
      { word: "\uC77C\uC8FC\uC77C", zh: "\u4E00\u5468" },
      { word: "\uD1B5\uACFC", zh: "\u901A\u8FC7" }
    ],
    grammar: ["-\uC138\uC694\uFF08\u8BF7\uFF09", "-\uAE4C\uC9C0\uFF08\u5230\uFF09", "-(\uC73C)\u3139 \uAC70\uC608\uC694\uFF08\u5C06\uFF09"]
  },
  {
    scene: "\u81EA\u6211\u4ECB\u7ECD",
    icon: "\u{1F64B}",
    lines: [
      { speaker: "B", ko: "\uC548\uB155\uD558\uC138\uC694. \uCC98\uC74C \uBD59\uACA0\uC2B5\uB2C8\uB2E4.", roman: "annyeonghaseyo. cheoeum boepget-seumnida", zh: "\u60A8\u597D\uFF0C\u521D\u6B21\u89C1\u9762\u3002" },
      { speaker: "A", ko: "\uBC18\uAC11\uC2B5\uB2C8\uB2E4. \uC774\uB984\uC774 \uC5B4\uB5BB\uAC8C \uB418\uC138\uC694?", roman: "bangapseumnida. ireumi eotteoke doeseyo?", zh: "\u5E78\u4F1A\u3002\u60A8\u600E\u4E48\u79F0\u547C\uFF1F" },
      { speaker: "B", ko: "\uBBFC\uC900\uC774\uB77C\uACE0 \uD569\uB2C8\uB2E4.", roman: "minjun-irago hamnida", zh: "\u6211\u53EB\u654F\u4FCA\u3002" },
      { speaker: "A", ko: "\uC5B4\uB514\uC11C \uC624\uC168\uC5B4\uC694?", roman: "eodiseo osyeosseoyo?", zh: "\u60A8\u4ECE\u54EA\u91CC\u6765\uFF1F" },
      { speaker: "B", ko: "\uC911\uAD6D\uC5D0\uC11C \uC654\uC5B4\uC694.", roman: "junggug-eseo wasseoyo", zh: "\u6211\u6765\u81EA\u4E2D\u56FD\u3002" }
    ],
    vocabulary: [
      { word: "\uCC98\uC74C", zh: "\u7B2C\u4E00\u6B21" },
      { word: "\uBD59\uB2E4", zh: "\u89C1\uFF08\u656C\u8BED\uFF09" },
      { word: "\uC774\uB984", zh: "\u540D\u5B57" },
      { word: "\uC911\uAD6D", zh: "\u4E2D\u56FD" }
    ],
    grammar: ["-(\uC73C)\uC2DC\uFF08\u656C\u8BED\uFF09", "-\uB77C\uACE0 \uD558\uB2E4\uFF08\u53EB\u505A\uFF09", "-\uC5D0\uC11C \uC624\uB2E4\uFF08\u6765\u81EA\uFF09"]
  },
  {
    scene: "\u9152\u5E97\u5165\u4F4F",
    icon: "\u{1F3E8}",
    lines: [
      { speaker: "B", ko: "\uC608\uC57D\uD55C \uBBFC\uC900\uC778\uB370\uC694.", roman: "yeyakan minjun-indeyo", zh: "\u6211\u662F\u9884\u7EA6\u7684\u654F\u4FCA\u3002" },
      { speaker: "A", ko: "\uC7A0\uC2DC\uB9CC\uC694, \uD655\uC778\uD560\uAC8C\uC694.", roman: "jamsimanyo, hwakinhalgeyo", zh: "\u7A0D\u7B49\uFF0C\u6211\u67E5\u4E00\u4E0B\u3002" },
      { speaker: "A", ko: "\uB124, 3\uBC15 4\uC77C\uC774\uC2DC\uB124\uC694. \uC5EC\uAD8C \uC8FC\uC138\uC694.", roman: "ne, sam-bak sa-il-isineyo. yeogwon juseyo", zh: "\u597D\u7684\uFF0C\u4F4F\u4E09\u665A\u56DB\u5929\u3002\u8BF7\u7ED9\u62A4\u7167\u3002" },
      { speaker: "B", ko: "\uC870\uC2DD \uD3EC\uD568\uC778\uAC00\uC694?", roman: "josisi pohamin-gayo?", zh: "\u542B\u65E9\u9910\u5417\uFF1F" },
      { speaker: "A", ko: "\uB124, 7\uC2DC\uBD80\uD130 10\uC2DC\uAE4C\uC9C0\uC608\uC694.", roman: "ne, ilgop-si-buteo yeol-si-kkaji-yeyo", zh: "\u542B\uFF0C7\u70B9\u523010\u70B9\u3002" }
    ],
    vocabulary: [
      { word: "\uC608\uC57D", zh: "\u9884\u7EA6" },
      { word: "\uD655\uC778", zh: "\u786E\u8BA4" },
      { word: "\uC870\uC2DD", zh: "\u65E9\u9910" },
      { word: "\uD3EC\uD568", zh: "\u5305\u542B" }
    ],
    grammar: ["-\uC778\uB370\uC694\uFF08\u662F\u2026\u2026\u6765\u7740\uFF09", "-\uD560\uAC8C\uC694\uFF08\u6211\u6765\u2026\u2026\uFF09", "-\uBD80\uD130 ~\uAE4C\uC9C0\uFF08\u4ECE\u2026\u5230\uFF09"]
  },
  {
    scene: "\u56FE\u4E66\u9986",
    icon: "\u{1F4DA}",
    lines: [
      { speaker: "B", ko: "\uC774 \uCC45 \uB300\uCD9C\uD560 \uC218 \uC788\uC5B4\uC694?", roman: "i chaek daechulhal su isseoyo?", zh: "\u8FD9\u672C\u4E66\u80FD\u501F\u5417\uFF1F" },
      { speaker: "A", ko: "\uB124, \uD559\uC0DD\uC99D \uBCF4\uC5EC\uC8FC\uC138\uC694.", roman: "ne, haksaengjeung boyeojuseyo", zh: "\u53EF\u4EE5\uFF0C\u8BF7\u51FA\u793A\u5B66\u751F\u8BC1\u3002" },
      { speaker: "B", ko: "\uC77C\uC8FC\uC77C \uBE4C\uB9B4 \uC218 \uC788\uB098\uC694?", roman: "il-ju-il billil su innayo?", zh: "\u80FD\u501F\u4E00\u5468\u5417\uFF1F" },
      { speaker: "A", ko: "\uB124, \uAE30\uD55C \uC9C0\uD0A4\uC138\uC694.", roman: "ne, gihan jikiseyo", zh: "\u53EF\u4EE5\uFF0C\u8BF7\u6309\u671F\u5F52\u8FD8\u3002" }
    ],
    vocabulary: [
      { word: "\uB300\uCD9C", zh: "\u501F\u51FA" },
      { word: "\uD559\uC0DD\uC99D", zh: "\u5B66\u751F\u8BC1" },
      { word: "\uBE4C\uB9AC\uB2E4", zh: "\u501F" },
      { word: "\uAE30\uD55C", zh: "\u671F\u9650" }
    ],
    grammar: ["-(\uC73C)\u3139 \uC218 \uC788\uB2E4\uFF08\u80FD\uFF09", "-\uC138\uC694\uFF08\u8BF7\uFF09", "-\uB098\uC694?\uFF08\u5417\uFF09"]
  },
  {
    scene: "\u6253\u7535\u8BDD",
    icon: "\u{1F4DE}",
    lines: [
      { speaker: "B", ko: "\uC5EC\uBCF4\uC138\uC694, \uBBFC\uC900 \uC528 \uC788\uC5B4\uC694?", roman: "yeoboseyo, minjun ssi isseoyo?", zh: "\u5582\uFF0C\u654F\u4FCA\u5728\u5417\uFF1F" },
      { speaker: "A", ko: "\uC7A0\uAE50\uB9CC\uC694, \uBC14\uAFD4\uB4DC\uB9B4\uAC8C\uC694.", roman: "jamkkanmanyo, bakkwoedeurilgeyo", zh: "\u7A0D\u7B49\uFF0C\u6211\u53EB\u4ED6\u3002" },
      { speaker: "B", ko: "\uB124, \uAE30\uB2E4\uB9B4\uAC8C\uC694.", roman: "ne, gidarilgeyo", zh: "\u597D\uFF0C\u6211\u7B49\u3002" },
      { speaker: "A", ko: "\uBBF8\uC548\uD574\uC694, \uC9C0\uAE08 \uD1B5\uD654 \uC911\uC774\uC5D0\uC694.", roman: "mianhaeyo, jigeum tonghwa jung-ieyo", zh: "\u62B1\u6B49\uFF0C\u4ED6\u6B63\u5728\u901A\u8BDD\u3002" }
    ],
    vocabulary: [
      { word: "\uC5EC\uBCF4\uC138\uC694", zh: "\u5582" },
      { word: "\uBC14\uAFB8\uB2E4", zh: "\u6362\uFF08\u53EB\u4EBA\uFF09" },
      { word: "\uAE30\uB2E4\uB9AC\uB2E4", zh: "\u7B49" },
      { word: "\uD1B5\uD654", zh: "\u901A\u8BDD" }
    ],
    grammar: ["\uC5EC\uBCF4\uC138\uC694\uFF08\u5582\uFF09", "-\uC911\uC774\uC5D0\uC694\uFF08\u6B63\u5728\uFF09", "-\uAC8C\uC694\uFF08\u6211\u6765\u2026\u2026\uFF09"]
  }
];

// src/data/grammar.ts
var GRAMMAR = [
  {
    id: "ieiga",
    level: "\u521D\u7EA7",
    pattern: "\uC774/\uAC00",
    name: "\u4E3B\u8BED\u52A9\u8BCD",
    explanation: "\uC774/\uAC00 \u662F\u7528\u4E8E\u6807\u8BB0\u4E3B\u8BED\u7684\u52A9\u8BCD\u3002\uAC00 \u7528\u5728\u4EE5\u5143\u97F3\u7ED3\u5C3E\u7684\u4F53\u8BCD\uFF08\u65E0\u6536\u97F3\uFF09\u540E\uFF0C\uC774 \u7528\u5728\u4EE5\u8F85\u97F3\u7ED3\u5C3E\u7684\u4F53\u8BCD\uFF08\u6709\u6536\u97F3\uFF09\u540E\u3002\u5B83\u4E0E \uC740/\uB294 \u7684\u6700\u5927\u533A\u522B\u5728\u4E8E\uFF1A\uC774/\uAC00 \u5F3A\u8C03\u201C\u662F\u8C01/\u662F\u4EC0\u4E48\u201D\uFF08\u4E3B\u8BED\u672C\u8EAB\uFF09\uFF0C\u5E38\u7528\u4E8E\u65B0\u4FE1\u606F\u3001\u5BA2\u89C2\u63CF\u8FF0\u3001\u5B58\u5728\u53E5\uFF08\uC788\uB2E4/\uC5C6\uB2E4\uFF09\u4EE5\u53CA\u80FD\u529B\u3001\u9700\u8981\u7B49\u53E5\u578B\u3002\u4F8B\u5982\u5728\u4ECB\u7ECD\u201C\u8FD9\u662F\u82F9\u679C\u201D\u6216\u201C\u6211\u6709\u4E66\u201D\u65F6\uFF0C\u5FC5\u987B\u4F7F\u7528 \uAC00/\uC774\u3002\u521D\u5B66\u8005\u5E38\u628A\u4E3B\u8BED\u4E00\u5F8B\u7528 \uC740/\uB294\uFF0C\u4F46\u5728\u201C\uB204\uAC00 \uC654\uC5B4\uC694?\u201D\uFF08\u8C01\u6765\u4E86\uFF1F\uFF09\u7684\u56DE\u7B54\u201C\uCCA0\uC218\uAC00 \uC654\uC5B4\uC694\u201D\uFF08\u54F2\u79C0\u6765\u4E86\uFF09\u4E2D\uFF0C\u5FC5\u987B\u7528 \uAC00 \u6765\u7A81\u51FA\u52A8\u4F5C\u7684\u6267\u884C\u8005\u3002\u638C\u63E1 \uC774/\uAC00 \u4E0E \uC740/\uB294 \u7684\u5206\u5DE5\uFF0C\u662F\u97E9\u8BED\u8868\u8FBE\u81EA\u7136\u4E0E\u5426\u7684\u5173\u952E\u7B2C\u4E00\u6B65\u3002",
    conjugation: "\u65E0\u6536\u97F3\u540D\u8BCD + \uAC00\uFF1B\u6709\u6536\u97F3\u540D\u8BCD + \uC774",
    examples: [
      { ko: "\uCCA0\uC218\uAC00 \uD559\uAD50\uC5D0 \uAC00\uC694.", roman: "cheolsuga hakgyoe gayo", zh: "\u54F2\u79C0\u53BB\u5B66\u6821\u3002" },
      { ko: "\uC0AC\uACFC\uAC00 \uC788\uC5B4\uC694.", roman: "sagwaga isseoyo", zh: "\u6709\u82F9\u679C\u3002" },
      { ko: "\uB204\uAC00 \uD588\uC5B4\uC694?", roman: "nuga haesseoyo", zh: "\u8C01\u505A\u7684\uFF1F" },
      { ko: "\uBE44\uAC00 \uC640\uC694.", roman: "biga wayo", zh: "\u4E0B\u96E8\u4E86\u3002" }
    ],
    notes: "\u5B58\u5728\u53E5(\uC788\uB2E4/\uC5C6\uB2E4)\u3001\u80FD\u529B(\uD560 \uC218 \uC788\uB2E4)\u3001\u9700\u8981(\uD544\uC694\uD558\uB2E4)\u524D\u4E3B\u8BED\u591A\u7528 \uC774/\uAC00\u3002",
    mnemonic: "\u201C\uAC00/\uC774 \u627E\u4E3B\u8BED\uFF0C\u5143\u97F3\u540E \uAC00\u3001\u8F85\u97F3\u540E \uC774\uFF1B\u65B0\u4FE1\u606F\u7528\uAC00\uFF0C\u65E7\u8BDD\u9898\u7528\uB294\u3002\u201D",
    common_errors: [
      { wrong: "\uCCA0\uC218\uB294 \uD559\uAD50\uC5D0 \uAC00\uC694.\uFF08\u56DE\u7B54\u201C\u8C01\u53BB\uFF1F\u201D\u65F6\uFF09", reason: "\u56DE\u7B54\u7279\u6307\u7591\u95EE\u4E3B\u8BED\u65F6\u5E94\u7A81\u51FA\u4E3B\u8BED\uFF0C\u7528 \uAC00 \u66F4\u81EA\u7136\u3002" },
      { wrong: "\uC0AC\uACFC\uB294 \uC788\uC5B4\uC694.", reason: "\u5B58\u5728\u53E5\u63CF\u8FF0\u201C\u6709\u67D0\u7269\u201D\u65F6\u4E3B\u8BED\u7528 \uAC00\u3002" }
    ],
    quiz: [
      { q: "\u201C\u4E66\uFF08\uCC45\uFF0C\u6709\u6536\u97F3\uFF09\u662F\u65B0\u7684\u201D\u4E3B\u8BED\u52A9\u8BCD\u7528\uFF1F", a: "\uC774 \u2192 \uCC45\uC774" },
      { q: "\u201C\u8C01\u6765\u4E86\uFF1F\u201D\u56DE\u7B54\u65F6\u5E94\u7A81\u51FA\u4E3B\u8BED\uFF0C\u7528 \uC740/\uB294 \u8FD8\u662F \uC774/\uAC00\uFF1F", a: "\uC774/\uAC00\uFF08\uAC00\uFF09" }
    ]
  },
  {
    id: "euneun",
    level: "\u521D\u7EA7",
    pattern: "\uC740/\uB294",
    name: "\u4E3B\u9898/\u5BF9\u6BD4\u52A9\u8BCD",
    explanation: "\uC740/\uB294 \u662F\u97E9\u8BED\u4E2D\u4F7F\u7528\u9891\u7387\u6700\u9AD8\u7684\u52A9\u8BCD\uFF0C\u7528\u4E8E\u6807\u8BB0\u53E5\u5B50\u7684\u4E3B\u9898\uFF08topic\uFF09\u3002\uB294 \u7528\u5728\u65E0\u6536\u97F3\u4F53\u8BCD\u540E\uFF0C\uC740 \u7528\u5728\u6709\u6536\u97F3\u4F53\u8BCD\u540E\u3002\u5B83\u7684\u6838\u5FC3\u529F\u80FD\u6709\u4E24\u70B9\uFF1A\u7B2C\u4E00\uFF0C\u628A\u5DF2\u77E5\u4FE1\u606F\uFF08\u65E7\u8BDD\u9898\uFF09\u63D0\u5230\u53E5\u9996\u4F5C\u4E3A\u8BA8\u8BBA\u80CC\u666F\uFF0C\u5982\u201C\uC800\uB294 \uD559\uC0DD\uC774\uC5B4\uC694\u201D\uFF08\u6211\u662F\u5B66\u751F\uFF09\uFF1B\u7B2C\u4E8C\uFF0C\u8868\u793A\u5BF9\u6BD4\uFF0C\u5982\u201C\uCEE4\uD53C\uB294 \uB9C8\uC154\uC694, \uCC28\uB294 \uC548 \uB9C8\uC154\uC694\u201D\uFF08\u5496\u5561\u559D\uFF0C\u8336\u4E0D\u559D\uFF09\u3002\u4E0E \uC774/\uAC00 \u4E0D\u540C\uFF0C\uC740/\uB294 \u4E0D\u5F3A\u8C03\u52A8\u4F5C\u7531\u8C01\u53D1\u51FA\uFF0C\u800C\u662F\u786E\u7ACB\u201C\u5173\u4E8E X\u201D\u7684\u9648\u8FF0\u6846\u67B6\u3002\u4E00\u4E2A\u5B9E\u7528\u89C4\u5F8B\uFF1A\u81EA\u6211\u4ECB\u7ECD\u3001\u8BF4\u660E\u8EAB\u4EFD\u65F6\u4E3B\u8BED\u7528 \uC740/\uB294\uFF1B\u63CF\u8FF0\u201C\u6709\u4EC0\u4E48/\u8C01\u505A\u4E86\u4EC0\u4E48\u201D\u65F6\u5BBE\u8BED\u6216\u4E3B\u8BED\u7528 \uC774/\uAC00\u3002\u4E24\u8005\u53EF\u4EE5\u5171\u73B0\uFF0C\u4F8B\u5982\u201C\uCCA0\uC218\uB294 \uD0A4\uAC00 \uCEE4\uC694\u201D\uFF08\u54F2\u79C0\u4E2A\u5B50\u9AD8\uFF09\u2014\u2014\uCCA0\uC218\uB294 \u662F\u4E3B\u9898\uFF0C\uD0A4\uAC00 \u662F\u4E3B\u8BED\u3002",
    conjugation: "\u65E0\u6536\u97F3\u540D\u8BCD + \uB294\uFF1B\u6709\u6536\u97F3\u540D\u8BCD + \uC740",
    examples: [
      { ko: "\uC800\uB294 \uD55C\uAD6D \uC0AC\uB78C\uC774\uC5D0\uC694.", roman: "jeoneun hanguk saramieyo", zh: "\u6211\u662F\u97E9\u56FD\u4EBA\u3002" },
      { ko: "\uCEE4\uD53C\uB294 \uC88B\uC544\uD574\uC694.", roman: "keopineun joahaeyo", zh: "\u6211\u559C\u6B22\u5496\u5561\u3002" },
      { ko: "\uB0A0\uC528\uB294 \uCD94\uC6CC\uC694.", roman: "nalssineun chuwowo", zh: "\u5929\u6C14\u51B7\u3002" },
      { ko: "\uCCA0\uC218\uB294 \uD559\uC0DD\uC774\uC5D0\uC694.", roman: "cheolsuneun haksaengieyo", zh: "\u54F2\u79C0\u662F\u5B66\u751F\u3002" }
    ],
    notes: "\uC740/\uB294 \u7528\u4E8E\u5BF9\u6BD4\u6216\u65E7\u4FE1\u606F\uFF1B\uC774/\uAC00 \u7528\u4E8E\u65B0\u4FE1\u606F\u6216\u4E3B\u8BED\u51F8\u663E\u3002",
    mnemonic: "\u201C\uC740/\uB294 \u662F\u8BDD\u9898\u738B\uFF0C\u5143\u97F3\u540E \uB294\u3001\u8F85\u97F3\u540E \uC740\uFF1B\u5BF9\u6BD4\u3001\u8EAB\u4EFD\u90FD\u7528\u5B83\u3002\u201D",
    common_errors: [
      { wrong: "\uC800\uAC00 \uD559\uC0DD\uC774\uC5D0\uC694.", reason: "\u81EA\u6211\u4ECB\u7ECD\u786E\u7ACB\u8EAB\u4EFD\u4E3B\u9898\uFF0C\u5E94\u7528 \uC800\uB294\u3002" },
      { wrong: "\uBB3C\uC740 \uC788\uC5B4\uC694.", reason: "\u5B58\u5728\u53E5\u4E3B\u8BED\u5E94\u7528 \uAC00\uFF08\uBB3C\uC774\uFF09\u3002" }
    ],
    quiz: [
      { q: "\u201C\u6211\uFF08\uC800\uFF0C\u65E0\u6536\u97F3\uFF09\u662F\u5B66\u751F\u201D\u4E3B\u9898\u52A9\u8BCD\u7528\uFF1F", a: "\uB294 \u2192 \uC800\uB294" },
      { q: "\u60F3\u8868\u8FBE\u201C\u5496\u5561\u559D\u3001\u8336\u4E0D\u559D\u201D\u7684\u5BF9\u6BD4\uFF0C\u5E94\u7528\u54EA\u4E2A\u52A9\u8BCD\uFF1F", a: "\uC740/\uB294" }
    ]
  },
  {
    id: "ayo",
    level: "\u521D\u7EA7",
    pattern: "(\uC544/\uC5B4)\uC694",
    name: "\u975E\u6B63\u5F0F\u793C\u8C8C\u7EC8\u7ED3\u8BED\u5C3E",
    explanation: "(\uC544/\uC5B4)\uC694 \u662F\u65E5\u5E38\u5BF9\u8BDD\u4E2D\u6700\u5E38\u7528\u7684\u53E5\u5C3E\uFF0C\u8868\u793A\u975E\u6B63\u5F0F\u4F46\u793C\u8C8C\u7684\u8BED\u6C14\uFF0C\u5BF9\u957F\u8F88\u3001\u964C\u751F\u4EBA\u3001\u670B\u53CB\u90FD\u9002\u7528\uFF0C\u662F\u97E9\u8BED\u5B66\u4E60\u8005\u7684\u201C\u4E07\u80FD\u53E5\u5C3E\u201D\u3002\u5176\u63A5\u7EED\u89C4\u5219\u53D6\u51B3\u4E8E\u52A8\u8BCD/\u5F62\u5BB9\u8BCD\u8BCD\u5E72\u6700\u540E\u4E00\u4E2A\u5143\u97F3\uFF1A\u82E5\u8BCD\u5E72\u5143\u97F3\u4E3A \u314F \u6216 \u3157\uFF0C\u7528 \uC544\uC694\uFF1B\u5176\u4F59\uFF08\u3153,\u315C,\u3161,\u3163 \u7B49\uFF09\u7528 \uC5B4\uC694\uFF1B\uD558\uB2E4 \u7C7B\u5F62\u5BB9\u8BCD/\u52A8\u8BCD\u53D8\u4E3A \uD574\uC694\u3002\u4F8B\u5982 \uAC00\uB2E4\u2192\uAC00\uC694\uFF0C\uBA39\uB2E4\u2192\uBA39\uC5B4\uC694\uFF0C\uC624\uB2E4\u2192\uC640\uC694\uFF0C\uACF5\uBD80\uD558\uB2E4\u2192\uACF5\uBD80\uD574\uC694\u3002\u6CE8\u610F \u314F/\u3157 \u7528 \uC544\uFF0C\u4F46 \uC624\uB2E4 \u56E0 \u3157 \u5374\u53D8 \uC640\uC694\uFF08\uC624+\uC544=\uC640\uFF09\uFF0C\u540C\u7406 \uD558\uB2E4 \u53D8 \uD574\uC694\u3002\u638C\u63E1\u8FD9\u4E00\u89C4\u5219\uFF0C\u4F60\u5C31\u80FD\u628A\u4EFB\u610F\u52A8\u8BCD\u53D8\u6210\u4E00\u53E5\u5F97\u4F53\u7684\u97E9\u8BED\u3002\u5426\u5B9A\u5F62\u5F0F\u4E3A \uC548 + \u52A8\u8BCD\uFF0C\u6216 \uC9C0 \uC54A\uC544\uC694\u3002",
    conjugation: "\u8BCD\u5E72\u5143\u97F3 \u314F/\u3157 \u2192 \uC544\uC694\uFF1B\u5176\u4ED6 \u2192 \uC5B4\uC694\uFF1B\uD558\uB2E4 \u2192 \uD574\uC694",
    examples: [
      { ko: "\uAC00\uC694.", roman: "gayo", zh: "\u53BB\u3002" },
      { ko: "\uBA39\uC5B4\uC694.", roman: "meogeoyo", zh: "\u5403\u3002" },
      { ko: "\uC640\uC694.", roman: "wayo", zh: "\u6765\u3002" },
      { ko: "\uACF5\uBD80\uD574\uC694.", roman: "gongbuhayo", zh: "\u5B66\u4E60\u3002" }
    ],
    notes: "\uD558\uB2E4 \u2192 \uD574\uC694\uFF1B\uC624\uB2E4 \u2192 \uC640\uC694\uFF1B\uC6B0\uB2E4 \u2192 \uC6CC\uC694\u3002",
    mnemonic: "\u201C\uC544\uC624\u7528\uC544\uC694\uFF0C\u5176\u4F59\u7528\uC5B4\uC694\uFF1B\uD558\uB2E4\u53D8\uD574\uC694\uFF0C\u793C\u8C8C\u53C8\u5730\u9053\u3002\u201D",
    common_errors: [
      { wrong: "\uAC00\uC5B4\uC694.", reason: "\uAC00\uB2E4 \u8BCD\u5E72\u5143\u97F3 \u314F\uFF0C\u5E94\u63A5 \uC544\uC694 \u2192 \uAC00\uC694\u3002" },
      { wrong: "\uACF5\uBD80\uC544\uC694.", reason: "\uD558\uB2E4 \u7C7B\u63A5 \uD574\uC694 \u2192 \uACF5\uBD80\uD574\uC694\u3002" }
    ],
    quiz: [
      { q: "\uBCF4\uB2E4\uFF08\u770B\uFF09\u7528 \uC544\uC694 \u8FD8\u662F \uC5B4\uC694\uFF1F", a: "\uC5B4\uC694 \u2192 \uBD10\uC694\uFF08\uC624+\uC544=\uC640\uFF09" },
      { q: "\uB9C8\uC2DC\uB2E4\uFF08\u559D\uFF09\u7684 (\uC544/\uC5B4)\uC694 \u5F62\u5F0F\uFF1F", a: "\uBA39\uB2E4 \u540C\u7406 \u2192 \uB9C8\uC154\uC694" }
    ]
  },
  {
    id: "eulreul",
    level: "\u521D\u7EA7",
    pattern: "\uC744/\uB97C",
    name: "\u5BBE\u8BED\u52A9\u8BCD",
    explanation: "\uC744/\uB97C \u7528\u4E8E\u6807\u8BB0\u5BBE\u8BED\uFF0C\u5373\u52A8\u4F5C\u652F\u914D\u7684\u5BF9\u8C61\u3002\uB97C \u7528\u5728\u65E0\u6536\u97F3\u4F53\u8BCD\u540E\uFF0C\uC744 \u7528\u5728\u6709\u6536\u97F3\u4F53\u8BCD\u540E\u3002\u4F8B\u5982\u201C\uC0AC\uACFC\uB97C \uBA39\uC5B4\uC694\u201D\uFF08\u5403\u82F9\u679C\uFF09\u3001\u201C\uCC45\uC744 \uC77D\uC5B4\uC694\u201D\uFF08\u8BFB\u4E66\uFF09\u3002\u5B83\u4E0E\u4E3B\u8BED\u52A9\u8BCD \uC774/\uAC00 \u914D\u5408\u51FA\u73B0\u662F\u97E9\u8BED\u57FA\u672C\u8BED\u5E8F\u201C\u4E3B\u8BED+\u5BBE\u8BED+\u52A8\u8BCD\u201D\u7684\u4F53\u73B0\u3002\u9700\u8981\u7279\u522B\u6CE8\u610F\u7684\u662F\uFF0C\u5F53\u5BBE\u8BED\u662F\u672A\u77E5\u7684\u65B0\u4FE1\u606F\u3001\u4E14\u53E5\u4E2D\u5DF2\u6709\uC740/\uB294 \u4E3B\u9898\u65F6\uFF0C\u5BBE\u8BED\u4E5F\u53EF\u7528 \uAC00/\uC774 \u5F3A\u8C03\uFF0C\u4F46\u521D\u5B66\u8005\u5148\u719F\u7EC3\u638C\u63E1 \uC744/\uB97C \u5373\u53EF\u3002\u5728\u4F7F\u52A8\u3001\u88AB\u52A8\u53CA\u67D0\u4E9B\u56FA\u5B9A\u642D\u914D\u4E2D\uFF0C\u5BBE\u8BED\u52A9\u8BCD\u4E5F\u4F1A\u53D8\u5316\uFF0C\u4F46\u521D\u7EA7\u9636\u6BB5\u4EE5 \uC744/\uB97C \u4E3A\u4E3B\u3002",
    conjugation: "\u65E0\u6536\u97F3\u540D\u8BCD + \uB97C\uFF1B\u6709\u6536\u97F3\u540D\u8BCD + \uC744",
    examples: [
      { ko: "\uC0AC\uACFC\uB97C \uBA39\uC5B4\uC694.", roman: "sagwareul meogeoyo", zh: "\u5403\u82F9\u679C\u3002" },
      { ko: "\uCC45\uC744 \uC77D\uC5B4\uC694.", roman: "chaegeul ilkeoyo", zh: "\u8BFB\u4E66\u3002" },
      { ko: "\uCEE4\uD53C\uB97C \uB9C8\uC154\uC694.", roman: "keopireul syeoyo", zh: "\u559D\u5496\u5561\u3002" },
      { ko: "\uD3B8\uC9C0\uB97C \uC368\uC694.", roman: "pyeonjireul sseoyo", zh: "\u5199\u4FE1\u3002" }
    ],
    notes: "\u5BBE\u8BED\u52A9\u8BCD\u4E0E\u4E3B\u8BED \uC774/\uAC00 \u642D\u914D\u6784\u6210 S+O+V \u8BED\u5E8F\u3002",
    mnemonic: "\u201C\uC744/\uB97C \u627E\u5BBE\u8BED\uFF0C\u65E0\u6536\u97F3\uB97C\u3001\u6709\u6536\u97F3\uC744\u3002\u201D",
    common_errors: [
      { wrong: "\uC0AC\uACFC\uC744 \uBA39\uC5B4\uC694.", reason: "\uC0AC\uACFC \u65E0\u6536\u97F3\uFF0C\u5E94\u7528 \uB97C\u3002" },
      { wrong: "\uCC45\uB97C \uC77D\uC5B4\uC694.", reason: "\uCC45 \u6709\u6536\u97F3\uFF0C\u5E94\u7528 \uC744\u3002" }
    ],
    quiz: [
      { q: "\u201C\u559D\u6C34\uFF08\uBB3C\uFF0C\u65E0\u6536\u97F3\uFF09\u201D\u5BBE\u8BED\u52A9\u8BCD\uFF1F", a: "\uB97C \u2192 \uBB3C\uC744? \u4E0D\uFF0C\uBB3C\u65E0\u6536\u97F3\u7528\uB97C \u2192 \uBB3C\uB97C? \u5B9E\u4E3A \uBB3C\uC744(\u3139\u6536\u97F3)! \uBB3C\u6709\u6536\u97F3\u3139 \u2192 \uC744" },
      { q: "\u201C\u8BFB\u4E66\u201D\u7684\u5BBE\u8BED\u52A9\u8BCD\uFF1F", a: "\uC744\uFF08\uCC45\u6709\u6536\u97F3\uFF09" }
    ]
  },
  {
    id: "go",
    level: "\u521D\u7EA7",
    pattern: "\uACE0",
    name: "\u8FDE\u63A5\u8BED\u5C3E\u201C\u5E76\u4E14/\u7136\u540E\u201D",
    explanation: "\uACE0 \u662F\u8FDE\u63A5\u4E24\u4E2A\u5206\u53E5\u7684\u8FDE\u63A5\u8BED\u5C3E\uFF0C\u8868\u793A\u52A8\u4F5C\u7684\u5E76\u5217\u6216\u5148\u540E\u987A\u627F\uFF0C\u76F8\u5F53\u4E8E\u6C49\u8BED\u7684\u201C\u2026\u2026\u5E76\u4E14/\u2026\u2026\u7136\u540E\u201D\u3002\u5B83\u76F4\u63A5\u63A5\u5728\u52A8\u8BCD/\u5F62\u5BB9\u8BCD\u8BCD\u5E72\u540E\uFF08\u65E0\u9700\u8003\u8651\u5143\u97F3\uFF09\uFF0C\u4F8B\u5982\u201C\uD559\uAD50\uC5D0 \uAC00\uACE0 \uC9D1\uC5D0 \uC640\uC694\u201D\uFF08\u53BB\u5B66\u6821\u7136\u540E\u56DE\u5BB6\uFF09\u3001\u201C\uCEE4\uD53C\uB97C \uB9C8\uC2DC\uACE0 \uACF5\uBD80\uD574\uC694\u201D\uFF08\u559D\u5496\u5561\u7136\u540E\u5B66\u4E60\uFF09\u3002\uACE0 \u8FD8\u53EF\u7528\u4E8E\u5F62\u5BB9\u8BCD\u5E76\u5217\uFF1A\u201C\uD06C\uACE0 \uC608\uBED0\uC694\u201D\uFF08\u53C8\u5927\u53C8\u6F02\u4EAE\uFF09\u3002\u4E0E \uC544\uC11C/\uC5B4\uC11C\uFF08\u8868\u539F\u56E0\u6216\u624B\u6BB5\uFF09\u4E0D\u540C\uFF0C\uACE0 \u4E0D\u5F3A\u8C03\u56E0\u679C\uFF0C\u53EA\u5E76\u5217\u6216\u987A\u63A5\u3002\u5426\u5B9A\u201C\uC548 \uD558\uB2E4\u201D\u4E5F\u53EF\u63A5 \uACE0\u3002\u5B83\u662F\u6784\u5EFA\u590D\u5408\u53E5\u6700\u57FA\u7840\u7684\u8BED\u5C3E\u4E4B\u4E00\u3002",
    conjugation: "\u52A8\u8BCD/\u5F62\u5BB9\u8BCD\u8BCD\u5E72 + \uACE0",
    examples: [
      { ko: "\uD559\uAD50\uC5D0 \uAC00\uACE0 \uC9D1\uC5D0 \uC640\uC694.", roman: "hakgyoe gago jibe wayo", zh: "\u53BB\u5B66\u6821\u7136\u540E\u56DE\u5BB6\u3002" },
      { ko: "\uCEE4\uD53C\uB97C \uB9C8\uC2DC\uACE0 \uACF5\uBD80\uD574\uC694.", roman: "keopireul masigo gongbuhayo", zh: "\u559D\u5496\u5561\u7136\u540E\u5B66\u4E60\u3002" },
      { ko: "\uD06C\uACE0 \uC608\uBED0\uC694.", roman: "keugo yeppeoyo", zh: "\u53C8\u5927\u53C8\u6F02\u4EAE\u3002" },
      { ko: "\uCC45\uC744 \uC77D\uACE0 \uC7A0\uC5B4\uC694.", roman: "chaegeul ilkgo jameoyo", zh: "\u8BFB\u4E66\u7136\u540E\u7761\u89C9\u3002" }
    ],
    notes: "\uACE0 \u8868\u5E76\u5217/\u987A\u63A5\uFF1B\uC544\uC11C/\uC5B4\uC11C \u8868\u539F\u56E0/\u624B\u6BB5\uFF0C\u4E8C\u8005\u52FF\u6DF7\u3002",
    mnemonic: "\u201C\uACE0 \u8FDE\u4E24\u4E2A\u52A8\u4F5C\uFF0C\u53C8\u2026\u2026\u53C8 / \u7136\u540E\u3002\u201D",
    common_errors: [
      { wrong: "\uAC00\uC11C \uC9D1\uC5D0 \uC640\uC694.\uFF08\u4EC5\u8868\u5148\u540E\u987A\u63A5\u65E0\u56E0\u679C\uFF09", reason: "\u65E0\u56E0\u679C\u7684\u5148\u540E\u7528 \uACE0 \u66F4\u81EA\u7136\u3002" }
    ],
    quiz: [
      { q: "\u201C\u5403\u996D\u7136\u540E\u5B66\u4E60\u201D\u5982\u4F55\u7528 \uACE0 \u8FDE\u63A5\uFF1F", a: "\uBC25\uC744 \uBA39\uACE0 \uACF5\uBD80\uD574\uC694" },
      { q: "\u201C\u53C8\u9AD8\u53C8\u5E05\u201D\u5F62\u5BB9\u8BCD\u5E76\u5217\uFF1F", a: "\uD06C\uACE0 \uC798\uC0DD\uACBC\uC5B4\uC694" }
    ]
  },
  {
    id: "myeon",
    level: "\u4E2D\u7EA7",
    pattern: "(\uC73C)\uBA74",
    name: "\u6761\u4EF6\u8BED\u5C3E\u201C\u5982\u679C\u201D",
    explanation: "(\uC73C)\uBA74 \u8868\u793A\u6761\u4EF6\u201C\u5982\u679C\u2026\u2026\u5C31\u2026\u2026\u201D\uFF0C\u63A5\u5728\u8BCD\u5E72\u540E\uFF1A\u6709\u6536\u97F3\uFF08\u542B \u3139 \u9664\u5916\uFF09\u52A0 \uC73C\uBA74\uFF0C\u65E0\u6536\u97F3\u6216\u6536\u97F3\u4E3A \u3139 \u65F6\u52A0 \uBA74\u3002\u4F8B\u5982\u201C\uC2DC\uAC04\uC774 \uC788\uC73C\uBA74 \uAC00\uC694\u201D\uFF08\u6709\u65F6\u95F4\u5C31\u53BB\uFF09\u3001\u201C\uBE44\uAC00 \uC624\uBA74 \uC548 \uAC00\uC694\u201D\uFF08\u4E0B\u96E8\u5C31\u4E0D\u53BB\uFF09\u3002\u6CE8\u610F\u5F62\u5BB9\u8BCD\u201C\uB9CE\uB2E4\u201D\u6536\u97F3\u3139\uFF0C\u76F4\u63A5 \uBA74 \u2192 \uB9CE\uC73C\uBA74\u3002\u5B83\u4E0E\u8868\u793A\u5047\u8BBE\u7684 \uB2E4\uB978 \uD45C\uD604(\uB2E4\uBA74/\uB77C\uBA74)\u8BED\u6C14\u76F8\u8FD1\uFF0C\u4F46 (\uC73C)\uBA74 \u6700\u901A\u7528\u3002\u5728\u53E3\u8BED\u4E2D\uFF0C(\uC73C)\uBA74 \u4E5F\u5E38\u7528\u4E8E\u4E60\u60EF\u6027\u6761\u4EF6\uFF1A\u201C\uB0A0\uC528\uAC00 \uC88B\uC73C\uBA74 \uC0B0\uCC45\uD574\uC694\u201D\uFF08\u5929\u6C14\u597D\u5C31\u6563\u6B65\uFF09\u3002\u6CE8\u610F\u4E0E \uC544\uC11C/\uC5B4\uC11C \u56E0\u679C\u533A\u522B\uFF1A\uBA74 \u8868\u5047\u8BBE\u672A\u53D1\u751F\uFF0C\uC544\uC11C \u8868\u5DF2\u53D1\u751F\u7684\u539F\u56E0\u3002",
    conjugation: "\u6709\u6536\u97F3(\u975E\u3139) + \uC73C\uBA74\uFF1B\u65E0\u6536\u97F3/\u6536\u97F3\u3139 + \uBA74",
    examples: [
      { ko: "\uC2DC\uAC04\uC774 \uC788\uC73C\uBA74 \uAC00\uC694.", roman: "sigani isseumyeon gayo", zh: "\u6709\u65F6\u95F4\u5C31\u53BB\u3002" },
      { ko: "\uBE44\uAC00 \uC624\uBA74 \uC548 \uAC00\uC694.", roman: "biga omyeon an gayo", zh: "\u4E0B\u96E8\u5C31\u4E0D\u53BB\u3002" },
      { ko: "\uB9CE\uC73C\uBA74 \uC8FC\uC138\uC694.", roman: "mangeumyeon juseyo", zh: "\u591A\u7684\u8BDD\u8BF7\u7ED9\u6211\u3002" },
      { ko: "\uCD94\uC6B0\uBA74 \uC785\uC5B4\uC694.", roman: "chuumyeon ibeoyo", zh: "\u51B7\u7684\u8BDD\u5C31\u7A7F\u3002" }
    ],
    notes: "\u6536\u97F3 \u3139 \u89C6\u4E3A\u65E0\u6536\u97F3\u76F4\u63A5 \uBA74\uFF08\uB9CE\uB2E4\u2192\uB9CE\uC73C\uBA74\uFF09\u3002",
    mnemonic: "\u201C\u6709\u6536\u97F3\u52A0\uC73C\uBA74\uFF0C\u65E0\u6536\u97F3\u76F4\u63A5\uBA74\uFF1B\u5982\u679C\u2026\u2026\u5C31\u2026\u2026\u201D",
    common_errors: [
      { wrong: "\uB9CE\uC73C\uBA74?\uFF08\u5E94\u4E3A \uB9CE\uC73C\uBA74\uFF0C\u6536\u97F3\u3139\u76F4\u63A5\uBA74\uFF09", reason: "\uB9CE\uB2E4 \u6536\u97F3\u3139 \u2192 \uB9CE\uC73C\uBA74 \u6B63\u786E\uFF0C\u6B64\u4F8B\u6B63\u786E\uFF1B\u5E38\u89C1\u9519\u662F\u628A \uB9CE\uB2E4 \u5F53\u4E00\u822C\u6536\u97F3\u52A0 \uC73C\uBA74\u2192\uB9CE\uC73C\uBA74\uFF08\u7ED3\u679C\u76F8\u540C\uFF09\u3002" },
      { wrong: "\uBE44\uAC00 \uC640\uC11C \uC548 \uAC00\uC694.\uFF08\u8868\u5047\u8BBE\u5E94\uBA74\uFF09", reason: "\u672A\u53D1\u751F\u5047\u8BBE\u7528 \uBA74\u3002" }
    ],
    quiz: [
      { q: "\u201C\u7D2F\u7684\u8BDD\u5C31\u4F11\u606F\u201D\u5982\u4F55\u7528 (\uC73C)\uBA74\uFF1F", a: "\uD53C\uACE4\uD558\uBA74 \uC26C\uC5B4\uC694" },
      { q: "\u201C\u4E0B\u96E8(\uBE44\uAC00 \uC624\uB2E4)\u7684\u8BDD\u201D\u6761\u4EF6\u5F62\uFF1F", a: "\uBE44\uAC00 \uC624\uBA74" }
    ]
  },
  {
    id: "jetense",
    level: "\u521D\u7EA7",
    pattern: "\uC558/\uC5C8/\uC600",
    name: "\u8FC7\u53BB\u65F6\u5236",
    explanation: "\uC558/\uC5C8/\uC600 \u662F\u97E9\u8BED\u8FC7\u53BB\u65F6\u7684\u6807\u5FD7\uFF0C\u52A0\u5728\u8BCD\u5E72\u4E0E\u53E5\u5C3E\u4E4B\u95F4\u3002\u89C4\u5219\uFF1A\u8BCD\u5E72\u5143\u97F3\u542B \u314F \u6216 \u3157 \u7528 \uC558\uFF1B\u5176\u4F59\u7528 \uC5C8\uFF1B\uD558\uB2E4 \u7C7B\u7528 \uC600\uFF08\u2192\uD588\uFF09\u3002\u4F8B\u5982 \uAC00\uB2E4\u2192\uAC14\uB2E4\uFF0C\uBA39\uB2E4\u2192\uBA39\uC5C8\uB2E4\uFF0C\uC624\uB2E4\u2192\uC654\uB2E4\uFF0C\uACF5\uBD80\uD558\uB2E4\u2192\uACF5\uBD80\uD588\uB2E4\u3002\u82E5\u8BCD\u5E72\u4EE5 \u314F/\u3157 \u7ED3\u5C3E\u5374\u9047 \uC774 \u540C\u5316\uFF08\u5982 \uD558\uB2E4\u2192\uD588\uFF09\uFF0C\u9700\u8BB0\u5FC6\u3002\u8FC7\u53BB\u65F6\u53EF\u4E0E\u5404\u79CD\u53E5\u5C3E\u7EC4\u5408\uFF1A\uAC14\uC5B4\uC694\uFF08\u793C\u8C8C\uFF09\u3001\uAC14\uB2E4\uFF08\u5E73\u53D9\uFF09\u3002\u5426\u5B9A\u8FC7\u53BB\uFF1A\uC548 \uAC14\uC5B4\uC694 / \uAC00\uC9C0 \uC54A\uC558\uC5B4\uC694\u3002\u8FC7\u53BB\u65F6\u4E0E (\uC73C)\u3134 \u5B9A\u8BED\u5F62\u7ED3\u5408\u53EF\u4FEE\u9970\u540D\u8BCD\uFF1A\u201C\uAC04 \uCE5C\uAD6C\u201D\uFF08\u53BB\u4E86\u7684\u670B\u53CB\uFF09\u3002",
    conjugation: "\u8BCD\u5E72\u542B \u314F/\u3157 \u2192 \uC558\uFF1B\u5176\u4ED6 \u2192 \uC5C8\uFF1B\uD558\uB2E4 \u2192 \uD588",
    examples: [
      { ko: "\uC5B4\uC81C \uC601\uD654\uB97C \uBD24\uC5B4\uC694.", roman: "eoje yeonghwareul bwasseoyo", zh: "\u6628\u5929\u770B\u4E86\u7535\u5F71\u3002" },
      { ko: "\uBC25\uC744 \uBA39\uC5C8\uC5B4\uC694.", roman: "babeul meogeosseoyo", zh: "\u5403\u4E86\u996D\u3002" },
      { ko: "\uCE5C\uAD6C\uB97C \uB9CC\uB0AC\uC5B4\uC694.", roman: "chingu-reul mannasseoyo", zh: "\u89C1\u4E86\u670B\u53CB\u3002" },
      { ko: "\uACF5\uBD80\uD588\uC5B4\uC694.", roman: "gongbuhwes-seoyo", zh: "\u5B66\u4E60\u4E86\u3002" }
    ],
    notes: "\uC624\uB2E4\u2192\uC654\uB2E4\uFF1B\uD558\uB2E4\u2192\uD588\uB2E4\u3002",
    mnemonic: "\u201C\u8FC7\u53BB\u65F6 \uC558/\uC5C8\uFF0C\u314F\u3157\u7528\uC558\uFF0C\u5176\u4F59\u7528\uC5C8\uFF0C\uD558\uB2E4\u7528\uD588\u3002\u201D",
    common_errors: [
      { wrong: "\uAC14\uC5C8\uC5B4\uC694?\uFF08\u91CD\u590D\u8FC7\u53BB\uFF09", reason: "\u4E00\u822C\u8FC7\u53BB\u7528 \uAC14\uC5B4\uC694 \u5373\u53EF\u3002" },
      { wrong: "\uACF5\uBD80\uC558\uC5B4\uC694.", reason: "\uD558\uB2E4 \u7528 \uD588 \u2192 \uACF5\uBD80\uD588\uC5B4\uC694\u3002" }
    ],
    quiz: [
      { q: "\u201C\u53BB\u4E86\uFF08\uAC00\uB2E4\uFF09\u201D\u7684\u8FC7\u53BB\u793C\u8C8C\u5F0F\uFF1F", a: "\uAC14\uC5B4\uC694" },
      { q: "\u201C\u505A\u4E86\uFF08\uD558\uB2E4\uFF09\u201D\u8FC7\u53BB\u5F0F\u8BCD\u5E72\u53D8\u5316\uFF1F", a: "\uD588\uFF08\uD588\uC5B4\uC694\uFF09" }
    ]
  },
  {
    id: "neunde",
    level: "\u4E2D\u7EA7",
    pattern: "(\uC73C)\u3134\uB370(\uC694)",
    name: "\u80CC\u666F/\u8F6C\u6298\u8FDE\u63A5\u8BED\u5C3E",
    explanation: "(\uC73C)\u3134\uB370(\uC694) \u662F\u4E00\u4E2A\u591A\u4E49\u8FDE\u63A5\u8BED\u5C3E\uFF0C\u5E38\u89C1\u4E8E\u4E09\u79CD\u8BED\u5883\uFF1A\u2460 \u94FA\u57AB\u80CC\u666F\uFF08\u5148\u8BF4\u60C5\u51B5\u518D\u63D0\u8BF7\u6C42\uFF09\uFF1A\u201C\uC9C0\uAE08 \uBC14\uC05C\uB370 \uB3C4\uC640\uC8FC\uC138\uC694\u201D\uFF08\u73B0\u5728\u5F88\u5FD9\uFF0C\u8BF7\u5E2E\u5E2E\u6211\uFF09\uFF1B\u2461 \u8F7B\u5FAE\u8F6C\u6298\uFF08\u7C7B\u4F3C\u201C\u53EF\u662F\u201D\uFF09\uFF1A\u201C\uBE44\uC2FC\uB370 \uC88B\uC544\uC694\u201D\uFF08\u867D\u7136\u8D35\u4F46\u5F88\u597D\uFF09\uFF1B\u2462 \u8BF4\u660E\u7406\u7531\u3002\u52A8\u8BCD\u73B0\u5728\u65F6\u7528 \uB294\uB370\uFF0C\u5F62\u5BB9\u8BCD/\u8FC7\u53BB\u65F6\u7528 (\uC73C)\u3134\uB370\uFF0C\u5C06\u6765/\u63A8\u6D4B\u7528 (\uC73C)\u3139\uD150\uB370\u3002\u5B83\u6BD4 \uADF8\uB7F0\uB370 \u66F4\u53E3\u8BED\u5316\uFF0C\u662F\u65E5\u5E38\u4EA4\u9645\u7684\u9AD8\u9891\u8BED\u5C3E\u3002\u6CE8\u610F\u4E0E \uC9C0\uB9CC\uFF08\u660E\u786E\u8F6C\u6298\uFF09\u533A\u5206\uFF1A\u3134\uB370 \u8F6C\u6298\u8BED\u6C14\u66F4\u67D4\u548C\uFF0C\u591A\u7528\u4E8E\u5F15\u51FA\u8BF7\u6C42\u6216\u80CC\u666F\u3002",
    conjugation: "\u52A8\u8BCD\u73B0\u5728\u65F6 + \uB294\uB370\uFF1B\u5F62\u5BB9\u8BCD/\u8FC7\u53BB + (\uC73C)\u3134\uB370\uFF1B\u5C06\u6765 + (\uC73C)\u3139\uD150\uB370",
    examples: [
      { ko: "\uC9C0\uAE08 \uBC14\uC05C\uB370\uC694.", roman: "jigeum bappeundeyo", zh: "\u73B0\u5728\u6709\u70B9\u5FD9\uFF08\u94FA\u57AB\uFF09\u3002" },
      { ko: "\uBE44\uC2FC\uB370 \uC88B\uC544\uC694.", roman: "bissande joayo", zh: "\u8D35\u662F\u8D35\uFF0C\u4F46\u5F88\u597D\u3002" },
      { ko: "\uC7A0\uAE50\uB9CC\uC694, \uC804\uD654\uD558\uB294\uB370\uC694.", roman: "jamkkanmanyo jeonhwahaneundeyo", zh: "\u7A0D\u7B49\uFF0C\u6211\u5728\u6253\u7535\u8BDD\u3002" },
      { ko: "\uB354\uC6B8 \uD150\uB370 \uC870\uC2EC\uD558\uC138\uC694.", roman: "deoul tende josimhaseyo", zh: "\u4F1A\u70ED\uFF0C\u8BF7\u5C0F\u5FC3\u3002" }
    ],
    notes: "\u3134\uB370 \u8BED\u6C14\u67D4\u548C\uFF0C\u5E38\u7528\u4E8E\u8BF7\u6C42\u524D\u94FA\u57AB\u6216\u8F7B\u5FAE\u8F6C\u6298\u3002",
    mnemonic: "\u201C\u3134\uB370 \u94FA\u57AB\u53C8\u8F6C\u6298\uFF0C\u52A8\u8BCD\uB294\uB370\u3001\u5F62\u5BB9\u8BCD\u3134\uB370\u3002\u201D",
    common_errors: [
      { wrong: "\uBC14\uC05C\uB370\uC694?\uFF08\u4F5C\u4E3A\u7591\u95EE\u53E5\u4E0D\u5F53\uFF09", reason: "\u3134\uB370 \u591A\u7528\u4E8E\u9648\u8FF0\u94FA\u57AB\uFF0C\u7591\u95EE\u7528 \uC9C0\uB9CC \u6216 \uADF8\uB7F0\uB370\u3002" }
    ],
    quiz: [
      { q: "\u201C\u6211\u5728\u5403\u996D\uFF08\uBA39\uB2E4\uFF09\uFF0C\u8BF7\u7A0D\u7B49\u201D\u5982\u4F55\u7528 \uB294\uB370\uFF1F", a: "\uBC25 \uBA39\uB294\uB370\uC694" },
      { q: "\u201C\u8D35(\uBE44\uC2F8\uB2E4)\u4F46\u597D\u201D\u8F6C\u6298\uFF1F", a: "\uBE44\uC2FC\uB370 \uC88B\uC544\uC694" }
    ]
  }
];

// src/data/book-vocabulary.ts
var bookVocab = [
  // ───────── 延世韩国语 1（前 3 课） ─────────
  {
    bookId: "yonsei-1",
    lesson: 1,
    lessonTitle: "\uC548\uB155\uD558\uC138\uC694 \u60A8\u597D",
    words: [
      { korean: "\uC548\uB155\uD558\uC138\uC694", chinese: "\u60A8\u597D\uFF08\u656C\u8BED\uFF09", phonetic: "an-nyeong-ha-se-yo", example: "\uC548\uB155\uD558\uC138\uC694. \uCC98\uC74C \uBD59\uACA0\uC2B5\uB2C8\uB2E4.", exampleCn: "\u60A8\u597D\uFF0C\u521D\u6B21\u89C1\u9762\u3002" },
      { korean: "\uAC10\uC0AC\uD569\uB2C8\uB2E4", chinese: "\u8C22\u8C22", phonetic: "gam-sa-hap-ni-da", example: "\uB3C4\uC640\uC8FC\uC154\uC11C \uAC10\uC0AC\uD569\uB2C8\uB2E4.", exampleCn: "\u8C22\u8C22\u60A8\u7684\u5E2E\u52A9\u3002" },
      { korean: "\uB124", chinese: "\u662F", phonetic: "ne" },
      { korean: "\uC544\uB2C8\uC694", chinese: "\u4E0D\u662F", phonetic: "a-ni-yo" },
      { korean: "\uC774\uB984", chinese: "\u540D\u5B57", phonetic: "i-reum", example: "\uC774\uB984\uC774 \uBB34\uC5C7\uC785\uB2C8\uAE4C?", exampleCn: "\u60A8\u53EB\u4EC0\u4E48\u540D\u5B57\uFF1F" }
    ]
  },
  {
    bookId: "yonsei-1",
    lesson: 2,
    lessonTitle: "\uD559\uAD50 \u5B66\u6821",
    words: [
      { korean: "\uD559\uAD50", chinese: "\u5B66\u6821", phonetic: "hak-kkyo", example: "\uD559\uAD50\uC5D0 \uAC00\uC694.", exampleCn: "\u53BB\u5B66\u6821\u3002" },
      { korean: "\uB3C4\uC11C\uAD00", chinese: "\u56FE\u4E66\u9986", phonetic: "do-seo-gwan" },
      { korean: "\uCE5C\uAD6C", chinese: "\u670B\u53CB", phonetic: "chin-gu", example: "\uCE5C\uAD6C\uB97C \uB9CC\uB0AC\uC5B4\uC694.", exampleCn: "\u89C1\u4E86\u670B\u53CB\u3002" },
      { korean: "\uCC45", chinese: "\u4E66", phonetic: "chaek" },
      { korean: "\uACF5\uBD80\uD558\uB2E4", chinese: "\u5B66\u4E60", phonetic: "gong-bu-ha-da" }
    ]
  },
  {
    bookId: "yonsei-1",
    lesson: 3,
    lessonTitle: "\uAC00\uC871 \u5BB6\u4EBA",
    words: [
      { korean: "\uAC00\uC871", chinese: "\u5BB6\u4EBA", phonetic: "ga-jok" },
      { korean: "\uC5B4\uBA38\uB2C8", chinese: "\u6BCD\u4EB2", phonetic: "eo-meo-ni" },
      { korean: "\uC544\uBC84\uC9C0", chinese: "\u7236\u4EB2", phonetic: "a-beo-ji" },
      { korean: "\uD615\uC81C", chinese: "\u5144\u5F1F", phonetic: "hyeong-je" },
      { korean: "\uC0AC\uB791\uD558\uB2E4", chinese: "\u7231", phonetic: "sa-rang-ha-da" }
    ]
  },
  // ───────── 标准韩国语 1（部分） ─────────
  {
    bookId: "std-korean-1",
    lesson: 1,
    lessonTitle: "\uAE30\uCD08 \u57FA\u7840",
    words: [
      { korean: "\uC548\uB155", chinese: "\u4F60\u597D/\u518D\u89C1\uFF08\u5E73\u8BED\uFF09", phonetic: "an-nyeong" },
      { korean: "\uC798", chinese: "\u597D\uFF08\u526F\u8BCD\uFF09", phonetic: "jal" },
      { korean: "\uBA39\uB2E4", chinese: "\u5403", phonetic: "meok-da" },
      { korean: "\uB9C8\uC2DC\uB2E4", chinese: "\u559D", phonetic: "ma-si-da" },
      { korean: "\uC8FC\uB2E4", chinese: "\u7ED9", phonetic: "ju-da" }
    ]
  },
  // ───────── 剑桥雅思 阅读高频词（英语，接入雅思单词本） ─────────
  {
    bookId: "cambridge-10",
    lesson: 0,
    lessonTitle: "\u9605\u8BFB\u9AD8\u9891\u8BCD",
    words: [
      { english: "hypothesis", chinese: "\u5047\u8BBE", phonetic: "/ha\u026A\u02C8p\u0252\u03B8\u0259s\u026As/", example: "The hypothesis was tested.", exampleCn: "\u8BE5\u5047\u8BBE\u88AB\u68C0\u9A8C\u3002" },
      { english: "methodology", chinese: "\u65B9\u6CD5\u8BBA", phonetic: "/\u02CCme\u03B8\u0259\u02C8d\u0252l\u0259d\u0292i/" },
      { english: "sustainable", chinese: "\u53EF\u6301\u7EED\u7684", phonetic: "/s\u0259\u02C8ste\u026An\u0259bl/" },
      { english: "biodiversity", chinese: "\u751F\u7269\u591A\u6837\u6027", phonetic: "/\u02CCba\u026A\u0259\u028Ada\u026A\u02C8v\u025C\u02D0s\u0259ti/" },
      { english: "inevitable", chinese: "\u4E0D\u53EF\u907F\u514D\u7684", phonetic: "/\u026An\u02C8ev\u026At\u0259bl/" },
      { english: "consequence", chinese: "\u540E\u679C", phonetic: "/\u02C8k\u0252ns\u026Akw\u0259ns/" },
      { english: "significant", chinese: "\u663E\u8457\u7684", phonetic: "/s\u026A\u0261\u02C8n\u026Af\u026Ak\u0259nt/" },
      { english: "phenomenon", chinese: "\u73B0\u8C61", phonetic: "/f\u0259\u02C8n\u0252m\u026An\u0259n/" },
      { english: "equivalent", chinese: "\u7B49\u4EF7\u7684", phonetic: "/\u026A\u02C8kw\u026Av\u0259l\u0259nt/" },
      { english: "coordinates", chinese: "\u5750\u6807", phonetic: "/k\u0259\u028A\u02C8\u0254\u02D0d\u026Ane\u026Ats/" }
    ]
  }
];

// src/data/daily.ts
var DAILY_LESSONS = [
  // ───────────────────────── Day 1 ─────────────────────────
  {
    day: 1,
    theme: "\u6253\u62DB\u547C\u4E0E\u81EA\u6211\u4ECB\u7ECD",
    words: [
      { korean: "\uC548\uB155\uD558\uC138\uC694", romanization: "annyeonghaseyo", chinese: "\u60A8\u597D\uFF08\u656C\u8BED\uFF09", level: 1 },
      { korean: "\uC548\uB155", romanization: "annyeong", chinese: "\u4F60\u597D / \u518D\u89C1\uFF08\u5E73\u8BED\uFF09", level: 1 },
      { korean: "\uAC10\uC0AC\uD569\uB2C8\uB2E4", romanization: "gamsahamnida", chinese: "\u8C22\u8C22\uFF08\u656C\u8BED\uFF09", level: 1 },
      { korean: "\uACE0\uB9D9\uC2B5\uB2C8\uB2E4", romanization: "gomapseumnida", chinese: "\u8C22\u8C22", level: 1 },
      { korean: "\uC8C4\uC1A1\uD569\uB2C8\uB2E4", romanization: "joesonghamnida", chinese: "\u5BF9\u4E0D\u8D77\uFF08\u656C\u8BED\uFF09", level: 1 },
      { korean: "\uB124", romanization: "ne", chinese: "\u662F / \u597D", level: 1 },
      { korean: "\uC544\uB2C8\uC694", romanization: "aniyo", chinese: "\u4E0D / \u4E0D\u662F", level: 1 },
      { korean: "\uC800\uB294", romanization: "jeoneun", chinese: "\u6211\uFF08\u4E3B\u9898\u52A9\u8BCD\uFF09", level: 1 },
      { korean: "\uC774\uB984", romanization: "ireum", chinese: "\u540D\u5B57", level: 1 },
      { korean: "\uD559\uC0DD", romanization: "haksaeng", chinese: "\u5B66\u751F", level: 1 },
      { korean: "\uD55C\uAD6D", romanization: "hanguk", chinese: "\u97E9\u56FD", level: 1 },
      { korean: "\uC0AC\uB78C", romanization: "saram", chinese: "\u4EBA", level: 1 },
      { korean: "\uCE5C\uAD6C", romanization: "chingu", chinese: "\u670B\u53CB", level: 1 },
      { korean: "\uB9CC\uB098\uC11C \uBC18\uAC11\uC2B5\uB2C8\uB2E4", romanization: "mannaseo bangapseumnida", chinese: "\u5F88\u9AD8\u5174\u89C1\u5230\u60A8", level: 1 },
      { korean: "\uC120\uC0DD\uB2D8", romanization: "seonsaengnim", chinese: "\u8001\u5E08", level: 1 }
    ],
    sentences: [
      { korean: "\uC548\uB155\uD558\uC138\uC694. \uB9CC\uB098\uC11C \uBC18\uAC11\uC2B5\uB2C8\uB2E4.", romanization: "annyeonghaseyo. mannaseo bangapseumnida.", chinese: "\u60A8\u597D\uFF0C\u5F88\u9AD8\u5174\u89C1\u5230\u60A8\u3002", level: 1 },
      { korean: "\uC800\uB294 \uD559\uC0DD\uC785\uB2C8\uB2E4.", romanization: "jeoneun haksaengimnida.", chinese: "\u6211\u662F\u5B66\u751F\u3002", level: 1 },
      { korean: "\uC81C \uC774\uB984\uC740 \uBBFC\uC900\uC785\uB2C8\uB2E4.", romanization: "je ireumeun minjunimnida.", chinese: "\u6211\u7684\u540D\u5B57\u662F\u654F\u4FCA\u3002", level: 1 },
      { korean: "\uAC10\uC0AC\uD569\uB2C8\uB2E4. \uC548\uB155\uD788 \uAC00\uC138\uC694.", romanization: "gamsahamnida. annyeonghi gaseyo.", chinese: "\u8C22\u8C22\u3002\u8BF7\u6162\u8D70\u3002", level: 1 },
      { korean: "\uC774\uBD84\uC740 \uC81C \uCE5C\uAD6C\uC785\uB2C8\uB2E4.", romanization: "ibuneun je chinguimnida.", chinese: "\u8FD9\u4F4D\u662F\u6211\u7684\u670B\u53CB\u3002", level: 1 }
    ],
    grammar: [
      { title: "\uC785\uB2C8\uB2E4 / \u3142\uB2C8\uB2E4\uFF08\u6B63\u5F0F\u656C\u8BED\u7ED3\u5C3E\uFF09", pattern: "\u8BCD\u5E72 + \u3142\uB2C8\uB2E4/\uC2B5\uB2C8\uB2E4", explanation: "\u52A8\u8BCD / \u5F62\u5BB9\u8BCD\u8BCD\u5E72\u540E\u52A0 \u3142\uB2C8\uB2E4 \u6216 \uC2B5\uB2C8\uB2E4\uFF0C\u7528\u4E8E\u6B63\u5F0F\u573A\u5408\u6216\u5BF9\u957F\u8F88\u8BF4\u8BDD\u3002", example: "\uD559\uC0DD\uC785\uB2C8\uB2E4. / \uAC10\uC0AC\uD569\uB2C8\uB2E4.", exampleCn: "\u662F\u5B66\u751F\u3002/ \u8C22\u8C22\u3002", level: 1 },
      { title: "\uC774\uB2E4 + \uC608\uC694 / \uC774\uC5D0\uC694\uFF08\u662F\uFF09", pattern: "\u540D\u8BCD + \uC774\uC5D0\uC694 / \uC608\uC694", explanation: '\u540D\u8BCD\u540E\u8868\u793A"\u662F"\uFF1B\u5F00\u97F3\u8282\uFF08\u65E0\u6536\u97F3\uFF09\u7528 \uC608\uC694\uFF0C\u95ED\u97F3\u8282\uFF08\u6709\u6536\u97F3\uFF09\u7528 \uC774\uC5D0\uC694\u3002', example: "\uD559\uC0DD\uC774\uC5D0\uC694. / \uCE5C\uAD6C\uC608\uC694.", exampleCn: "\u662F\u5B66\u751F\u3002/ \u662F\u670B\u53CB\u3002", level: 1 },
      { title: "\uC740 / \uB294\uFF08\u4E3B\u9898\u6807\u8BB0\uFF09", pattern: "\u4F53\u8BCD + \uC740 / \uB294", explanation: "\u6807\u793A\u53E5\u5B50\u4E3B\u9898\uFF1A\u95ED\u97F3\u8282\u7528 \uC740\uFF0C\u5F00\u97F3\u8282\u7528 \uB294\u3002", example: "\uC800\uB294 / \uC774\uB984\uC740", exampleCn: "\u6211\uFF08\u4E3B\u9898\uFF09/ \u540D\u5B57\uFF08\u4E3B\u9898\uFF09", level: 1 },
      { title: "\uB124 / \uC544\uB2C8\uC694\uFF08\u662F\u975E\u56DE\u7B54\uFF09", pattern: "\uB124 / \uC544\uB2C8\uC694", explanation: "\u5BF9\u4E00\u822C\u7591\u95EE\u53E5\u7528 \uB124\uFF08\u662F\uFF09\u6216 \uC544\uB2C8\uC694\uFF08\u4E0D\u662F\uFF09\u56DE\u7B54\u3002", example: "\uB124, \uD559\uC0DD\uC785\uB2C8\uB2E4.", exampleCn: "\u662F\u7684\uFF0C\u6211\u662F\u5B66\u751F\u3002", level: 1 },
      { title: "\uC548\uB155\uD558\uC138\uC694 vs \uC548\uB155", pattern: "\u656C\u8BED / \u5E73\u8BED", explanation: "\u524D\u8005\u662F\u656C\u8BED\uFF0C\u5BF9\u964C\u751F\u4EBA\u6216\u957F\u8F88\uFF1B\u540E\u8005\u662F\u5E73\u8BED\uFF0C\u5BF9\u670B\u53CB\u6216\u665A\u8F88\u3002", example: "\uC548\uB155\uD558\uC138\uC694(\u656C) / \uC548\uB155(\u5E73)", exampleCn: "\u60A8\u597D / \u4F60\u597D", level: 1 }
    ],
    quiz: [
      { q: '"\u8C22\u8C22"\u7684\u97E9\u8BED\u656C\u8BED\u662F\uFF1F', options: ["\uAC10\uC0AC\uD569\uB2C8\uB2E4", "\uC548\uB155\uD558\uC138\uC694", "\uC8C4\uC1A1\uD569\uB2C8\uB2E4"], answer: 0, explain: '\uAC10\uC0AC\uD569\uB2C8\uB2E4 \u662F"\u8C22\u8C22"\u7684\u656C\u8BED\u8BF4\u6CD5\u3002' },
      { q: '"\u6211\u662F\u5B66\u751F"\u600E\u4E48\u8BF4\uFF1F', options: ["\uC800\uB294 \uD559\uC0DD\uC785\uB2C8\uB2E4", "\uD559\uC0DD \uC800\uB294\uC785\uB2C8\uB2E4", "\uC800\uB294 \uD559\uC0DD\uC774\uC5D0\uC694\uC694"], answer: 0, explain: "\u4E3B\u9898\u52A9\u8BCD\uB294 \u7528\u5728 \uC800 \u540E\uFF0C\u5224\u65AD\u7528 \uC785\uB2C8\uB2E4\u3002" },
      { q: '\u8868\u793A"\u4E3B\u9898"\u7684\u52A9\u8BCD\u662F\uFF1F', options: ["\uC740 / \uB294", "\uC744 / \uB97C", "\uC5D0\uC11C"], answer: 0, explain: "\uC740/\uB294 \u662F\u4E3B\u9898\u6807\u8BB0\uFF0C\uC744/\uB97C \u662F\u5BBE\u683C\u3002" },
      { q: '"\u540D\u5B57"\u7684\u97E9\u8BED\u662F\uFF1F', options: ["\uC774\uB984", "\uB098\uC774", "\uC0AC\uB78C"], answer: 0, explain: "\uC774\uB984 = \u540D\u5B57\uFF1B\uB098\uC774 = \u5E74\u9F84\uFF1B\uC0AC\uB78C = \u4EBA\u3002" },
      { q: '\u5BF9\u957F\u8F88\u8BF4"\u4F60\u597D"\u5E94\u8BE5\u7528\uFF1F', options: ["\uC548\uB155", "\uC548\uB155\uD558\uC138\uC694", "\uC798 \uC790\uC694"], answer: 1, explain: "\u5BF9\u957F\u8F88\u6216\u964C\u751F\u4EBA\u7528\u656C\u8BED \uC548\uB155\uD558\uC138\uC694\u3002" }
    ]
  },
  // ───────────────────────── Day 2 ─────────────────────────
  {
    day: 2,
    theme: "\u6570\u5B57\u4E0E\u5E74\u9F84",
    words: [
      { korean: "\uD558\uB098", romanization: "hana", chinese: "\u4E00\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uB458", romanization: "dul", chinese: "\u4E8C\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uC14B", romanization: "set", chinese: "\u4E09\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uB137", romanization: "net", chinese: "\u56DB\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uB2E4\uC12F", romanization: "daseot", chinese: "\u4E94\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uC5F4", romanization: "yeol", chinese: "\u5341\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uC2A4\uBB3C", romanization: "seumul", chinese: "\u4E8C\u5341\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uB098\uC774", romanization: "nai", chinese: "\u5E74\u9F84", level: 1 },
      { korean: "\uBA87", romanization: "myeot", chinese: "\u51E0\uFF08\u7591\u95EE\uFF09", level: 1 },
      { korean: "\uC0B4", romanization: "sal", chinese: "\u5C81", level: 1 },
      { korean: "\uC2ED", romanization: "sip", chinese: "\u5341\uFF08\u6C49\u5B57\u6570\u8BCD\uFF09", level: 2 },
      { korean: "\uC774\uC2ED", romanization: "isip", chinese: "\u4E8C\u5341\uFF08\u6C49\u5B57\u6570\u8BCD\uFF09", level: 2 },
      { korean: "\uBC31", romanization: "baek", chinese: "\u767E\uFF08\u6C49\u5B57\u6570\u8BCD\uFF09", level: 2 },
      { korean: "\uC11C\uB978", romanization: "seoreun", chinese: "\u4E09\u5341\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 },
      { korean: "\uB9C8\uD754", romanization: "maheun", chinese: "\u56DB\u5341\uFF08\u56FA\u6709\u6570\u8BCD\uFF09", level: 1 }
    ],
    sentences: [
      { korean: "\uC81C \uB098\uC774\uB294 \uC2A4\uBB34 \uC0B4\uC785\uB2C8\uB2E4.", romanization: "je naineun seumu sarimnida.", chinese: "\u6211\u4E8C\u5341\u5C81\u3002", level: 1 },
      { korean: "\uBA87 \uC0B4\uC774\uC5D0\uC694?", romanization: "myeot sarieyo?", chinese: "\u51E0\u5C81\u5440\uFF1F", level: 1 },
      { korean: "\uC5F4 \uC0B4\uC785\uB2C8\uB2E4.", romanization: "yeol sarimnida.", chinese: "\u5341\u5C81\u3002", level: 1 },
      { korean: "\uC2A4\uBB3C\uB2E4\uC12F \uC0B4\uC774\uC5D0\uC694.", romanization: "seumuldaseot sarieyo.", chinese: "\u4E8C\u5341\u4E94\u5C81\u3002", level: 1 },
      { korean: "\uC11C\uB978 \uC0B4\uC774\uC5D0\uC694.", romanization: "seoreun sarieyo.", chinese: "\u4E09\u5341\u5C81\u3002", level: 1 }
    ],
    grammar: [
      { title: "\u56FA\u6709\u6570\u8BCD vs \u6C49\u5B57\u6570\u8BCD", pattern: "\uD558\uB098~ / \uC77C,\uC774,\uC0BC~", explanation: "\u5E74\u9F84\u3001\u4E2A\u6570\u3001\u987A\u5E8F\u5E38\u7528\u56FA\u6709\u6570\u8BCD\uFF08\uD558\uB098,\uB458\u2026\uFF09\uFF1B\u91D1\u989D\u3001\u65E5\u671F\u3001\u7535\u8BDD\u5E38\u7528\u6C49\u5B57\u6570\u8BCD\uFF08\uC77C,\uC774,\uC0BC\u2026\uFF09\u3002", example: "\uC2A4\uBB34 \uC0B4(\u5E74\u9F84) / \uCC9C \uC6D0(\u91D1\u989D)", exampleCn: "\u4E8C\u5341\u5C81 / \u4E00\u5343\u97E9\u5143", level: 1 },
      { title: "\uC0B4\uFF08\u5C81\uFF09", pattern: "\u56FA\u6709\u6570\u8BCD + \uC0B4", explanation: "\u5E74\u9F84\u5355\u4F4D\uFF0C\u4E0E\u56FA\u6709\u6570\u8BCD\u8FDE\u7528\u3002", example: "\uC2A4\uBB34 \uC0B4", exampleCn: "\u4E8C\u5341\u5C81", level: 1 },
      { title: "\uBA87\uFF08\u7591\u95EE\u8BCD\uFF09", pattern: "\uBA87 + \u91CF\u8BCD", explanation: '\u8868\u793A"\u51E0"\uFF0C\u5982 \uBA87 \uC0B4\uFF08\u51E0\u5C81\uFF09\u3001\uBA87 \uBA85\uFF08\u51E0\u4E2A\u4EBA\uFF09\u3002', example: "\uBA87 \uC0B4\uC774\uC5D0\uC694?", exampleCn: "\u51E0\u5C81\u4E86\uFF1F", level: 1 },
      { title: "\uC774\uC5D0\uC694 / \uC608\uC694 \u590D\u4E60", pattern: "\u540D\u8BCD + \uC774\uC5D0\uC694 / \uC608\uC694", explanation: "\u540D\u8BCD\u5224\u65AD\u53E5\uFF0C\u95ED\u97F3\u8282+\uC774\uC5D0\uC694\u3002", example: "\uC2A4\uBB34 \uC0B4\uC774\uC5D0\uC694.", exampleCn: "\u662F\u4E8C\u5341\u5C81\u3002", level: 1 },
      { title: "\uD55C\uAD6D \uB098\uC774\uFF08\u97E9\u56FD\u5E74\u9F84\uFF09", pattern: "\u2014", explanation: '\u97E9\u56FD\u4F20\u7EDF\u7B97\u6CD5\uFF1A\u51FA\u751F\u5373 1 \u5C81\uFF0C\u6BCF\u5E74\u6625\u8282 +1\uFF0C\u53EB"\uD55C\uAD6D \uB098\uC774"\u3002', example: "\uD55C\uAD6D \uB098\uC774\uB294 \uC2A4\uBB3C\uC5EC\uB35F \uC0B4", exampleCn: "\u97E9\u56FD\u5E74\u9F84\u662F\u4E8C\u5341\u516B\u5C81", level: 2 }
    ],
    quiz: [
      { q: '"\u4E94"\u7684\u56FA\u6709\u6570\u8BCD\u662F\uFF1F', options: ["\uB2E4\uC12F", "\uC624", "\uAD6C"], answer: 0, explain: '\uB2E4\uC12F \u662F\u4E94\u7684\u56FA\u6709\u6570\u8BCD\uFF1B\uC624 \u662F\u6C49\u5B57\u6570\u8BCD"\u4E94"\u3002' },
      { q: '"\u4E8C\u5341\u5C81"\u7528\u54EA\u79CD\u8BF4\u6CD5\uFF1F', options: ["\uC2A4\uBB34 \uC0B4", "\uC774\uC2ED \uC0B4", "\uC774\uC2ED\uC138"], answer: 0, explain: "\u5E74\u9F84\u7528\u56FA\u6709\u6570\u8BCD\uFF0C\u4E8C\u5341\u5C81 = \uC2A4\uBB34 \uC0B4\u3002" },
      { q: '"\u51E0\u5C81"\u600E\u4E48\u95EE\uFF1F', options: ["\uBA87 \uC0B4", "\uBA87 \uBA85", "\uBA87 \uAC1C"], answer: 0, explain: "\uBA87 \uC0B4 = \u51E0\u5C81\uFF1B\uBA87 \uBA85 = \u51E0\u4E2A\u4EBA\uFF1B\uBA87 \uAC1C = \u51E0\u4E2A\u3002" },
      { q: "\u5E74\u9F84\u4E00\u822C\u7528\u54EA\u79CD\u6570\u8BCD\uFF1F", options: ["\u56FA\u6709\u6570\u8BCD", "\u6C49\u5B57\u6570\u8BCD", "\u90FD\u53EF\u4EE5"], answer: 0, explain: "\u5E74\u9F84\u3001\u4E2A\u6570\u7528\u56FA\u6709\u6570\u8BCD\uFF08\uD558\uB098~\uFF09\u3002" },
      { q: '"\u767E"\u7684\u6C49\u5B57\u6570\u8BCD\u662F\uFF1F', options: ["\uBC31", "\uD558\uB098", "\uC77C\uBC31"], answer: 0, explain: '\uBC31 \u672C\u8EAB\u5C31\u662F"\u767E"\uFF1B\uC77C\uBC31 \u662F"\u4E00\u767E"\u3002' }
    ]
  },
  // ───────────────────────── Day 3 ─────────────────────────
  {
    day: 3,
    theme: "\u5BB6\u5EAD\u4E0E\u4EBA\u7269",
    words: [
      { korean: "\uAC00\uC871", romanization: "gajok", chinese: "\u5BB6\u4EBA", level: 1 },
      { korean: "\uC544\uBC84\uC9C0", romanization: "abeoji", chinese: "\u7238\u7238", level: 1 },
      { korean: "\uC5B4\uBA38\uB2C8", romanization: "eomeoni", chinese: "\u5988\u5988", level: 1 },
      { korean: "\uC624\uBE60", romanization: "oppa", chinese: "\u54E5\u54E5\uFF08\u5973\u79F0\uFF09", level: 1 },
      { korean: "\uC5B8\uB2C8", romanization: "eonni", chinese: "\u59D0\u59D0\uFF08\u5973\u79F0\uFF09", level: 1 },
      { korean: "\uD615", romanization: "hyeong", chinese: "\u54E5\u54E5\uFF08\u7537\u79F0\uFF09", level: 1 },
      { korean: "\uB204\uB098", romanization: "nuna", chinese: "\u59D0\u59D0\uFF08\u7537\u79F0\uFF09", level: 1 },
      { korean: "\uB3D9\uC0DD", romanization: "dongsaeng", chinese: "\u5F1F\u5F1F / \u59B9\u59B9", level: 1 },
      { korean: "\uD560\uC544\uBC84\uC9C0", romanization: "harabeoji", chinese: "\u7237\u7237", level: 1 },
      { korean: "\uD560\uBA38\uB2C8", romanization: "halmeoni", chinese: "\u5976\u5976", level: 1 },
      { korean: "\uC544\uB4E4", romanization: "adeul", chinese: "\u513F\u5B50", level: 1 },
      { korean: "\uB538", romanization: "ttal", chinese: "\u5973\u513F", level: 1 },
      { korean: "\uB0A8\uD3B8", romanization: "nampyeon", chinese: "\u4E08\u592B", level: 2 },
      { korean: "\uC544\uB0B4", romanization: "anae", chinese: "\u59BB\u5B50", level: 2 },
      { korean: "\uC2DD\uAD6C", romanization: "sikgu", chinese: "\u5BB6\u5EAD\u6210\u5458", level: 1 }
    ],
    sentences: [
      { korean: "\uC6B0\uB9AC \uAC00\uC871\uC740 \uB2E4\uC12F \uBA85\uC785\uB2C8\uB2E4.", romanization: "uri gajogeun daseot myeongimnida.", chinese: "\u6211\u5BB6\u6709\u4E94\u53E3\u4EBA\u3002", level: 1 },
      { korean: "\uC624\uBE60\uB294 \uD559\uC0DD\uC785\uB2C8\uB2E4.", romanization: "oppaneun haksaengimnida.", chinese: "\u54E5\u54E5\u662F\u5B66\u751F\u3002", level: 1 },
      { korean: "\uB3D9\uC0DD\uC774 \uC788\uC5B4\uC694.", romanization: "dongsaengi isseoyo.", chinese: "\u6211\u6709\u5F1F\u5F1F / \u59B9\u59B9\u3002", level: 1 },
      { korean: "\uC5B4\uBA38\uB2C8\uB97C \uC0AC\uB791\uD574\uC694.", romanization: "eomeonireul saranghaeyo.", chinese: "\u6211\u7231\u5988\u5988\u3002", level: 1 },
      { korean: "\uD560\uBA38\uB2C8 \uC9D1\uC5D0 \uAC00\uC694.", romanization: "halmeoni jibe gayo.", chinese: "\u53BB\u5976\u5976\u5BB6\u3002", level: 1 }
    ],
    grammar: [
      { title: "\u79F0\u8C13\u7684\u7537\u5973\u533A\u5206", pattern: "\uC624\uBE60/\uC5B8\uB2C8 vs \uD615/\uB204\uB098", explanation: "\u53EB\u54E5\u54E5\uFF1A\u5973\u751F\u53EB \uC624\uBE60\uFF0C\u7537\u751F\u53EB \uD615\uFF1B\u53EB\u59D0\u59D0\uFF1A\u5973\u751F\u53EB \uC5B8\uB2C8\uFF0C\u7537\u751F\u53EB \uB204\uB098\u3002", example: "\uC624\uBE60(\u5973\u79F0\u54E5) / \uD615(\u7537\u79F0\u54E5)", exampleCn: "\u54E5\u54E5\uFF08\u5973\u79F0\uFF09/ \u54E5\u54E5\uFF08\u7537\u79F0\uFF09", level: 1 },
      { title: "\uBA85\uFF08\u540D / \u4EBA\uFF09", pattern: "\u6570\u5B57 + \uBA85", explanation: "\u4EBA\u6570\u5355\u4F4D\uFF1A\uD55C \uBA85\uFF08\u4E00\u4EBA\uFF09\u3001\uB2E4\uC12F \uBA85\uFF08\u4E94\u4EBA\uFF09\u3002", example: "\uB2E4\uC12F \uBA85", exampleCn: "\u4E94\u53E3\u4EBA", level: 1 },
      { title: "\uC788\uC5B4\uC694 / \uC5C6\uC5B4\uC694\uFF08\u6709 / \u6CA1\u6709\uFF09", pattern: "\u4F53\u8BCD + \uC774/\uAC00 + \uC788\uC5B4\uC694", explanation: "\u8868\u793A\u5B58\u5728\u6216\u62E5\u6709\u3002", example: "\uB3D9\uC0DD\uC774 \uC788\uC5B4\uC694.", exampleCn: "\u6709\u5F1F\u5F1F/\u59B9\u59B9\u3002", level: 1 },
      { title: "\uC5D0 \uAC00\uC694\uFF08\u53BB\uFF5E\uFF09", pattern: "\u5730\u70B9 + \uC5D0 + \uAC00\uB2E4", explanation: '\u76EE\u7684\u5730\u52A9\u8BCD \uC5D0 \u52A0"\u53BB"\u3002', example: "\uC9D1\uC5D0 \uAC00\uC694.", exampleCn: "\u56DE\u5BB6\u3002", level: 1 },
      { title: "\uC744 / \uB791 \uC0AC\uB791\uD574\uC694\uFF08\u7231\uFF5E\uFF09", pattern: "\u5BBE\u683C + \uC0AC\uB791\uD558\uB2E4", explanation: "\u5BBE\u683C\u52A9\u8BCD \uC744/\uB97C \u6807\u8BB0\u7231\u7684\u5BF9\u8C61\u3002", example: "\uC5B4\uBA38\uB2C8\uB97C \uC0AC\uB791\uD574\uC694.", exampleCn: "\u7231\u5988\u5988\u3002", level: 1 }
    ],
    quiz: [
      { q: '\u5973\u751F\u53EB"\u54E5\u54E5"\u7528\uFF1F', options: ["\uC624\uBE60", "\uD615", "\uB204\uB098"], answer: 0, explain: "\u5973\u79F0\u54E5\u54E5 = \uC624\uBE60\uFF1B\u7537\u79F0\u54E5\u54E5 = \uD615\u3002" },
      { q: '"\u6211\u5BB6\u6709\u4E94\u53E3\u4EBA"\u54EA\u9879\u6B63\u786E\uFF1F', options: ["\uC6B0\uB9AC \uAC00\uC871\uC740 \uB2E4\uC12F \uBA85\uC785\uB2C8\uB2E4", "\uC6B0\uB9AC \uAC00\uC871 \uB2E4\uC12F \uBA85", "\uAC00\uC871\uC740 \uB2E4\uC12F \uBA85\uC774\uC5D0\uC694"], answer: 0, explain: "\u4EBA\u6570\u7528 \uBA85\uFF0C\u5E76\u52A0\u6B63\u5F0F\u7ED3\u5C3E\uC785\uB2C8\uB2E4\u3002" },
      { q: '"\u6709\u5F1F\u5F1F"\u600E\u4E48\u8BF4\uFF1F', options: ["\uB3D9\uC0DD\uC774 \uC788\uC5B4\uC694", "\uB3D9\uC0DD \uC788\uC5B4\uC694", "\uB3D9\uC0DD\uC744 \uC788\uC5B4\uC694"], answer: 0, explain: "\u5B58\u5728\u53E5\u4E3B\u8BED\u7528 \uC774/\uAC00\uFF1A\uB3D9\uC0DD\uC774 \uC788\uC5B4\uC694\u3002" },
      { q: '\u7537\u751F\u53EB"\u59D0\u59D0"\u7528\uFF1F', options: ["\uC5B8\uB2C8", "\uB204\uB098", "\uD615"], answer: 1, explain: "\u5973\u79F0\u59D0\u59D0 = \uC5B8\uB2C8\uFF1B\u7537\u79F0\u59D0\u59D0 = \uB204\uB098\u3002" },
      { q: '"\u53BB\u5976\u5976\u5BB6"\u7684"\u53BB"\u5BF9\u5E94\uFF1F', options: ["\uAC00\uC694", "\uC0AC\uC694", "\uC790\uC694"], answer: 0, explain: "\uAC00\uB2E4 = \u53BB\uFF0C\u656C\u8BED \uAC00\uC694\u3002" }
    ]
  },
  // ───────────────────────── Day 4 ─────────────────────────
  {
    day: 4,
    theme: "\u98DF\u7269\u4E0E\u9910\u5385",
    words: [
      { korean: "\uBC25", romanization: "bap", chinese: "\u996D", level: 1 },
      { korean: "\uBB3C", romanization: "mul", chinese: "\u6C34", level: 1 },
      { korean: "\uAE40\uCE58", romanization: "gimchi", chinese: "\u6CE1\u83DC", level: 1 },
      { korean: "\uACE0\uAE30", romanization: "gogi", chinese: "\u8089", level: 1 },
      { korean: "\uCC44\uC18C", romanization: "chaeso", chinese: "\u852C\u83DC", level: 1 },
      { korean: "\uC0AC\uACFC", romanization: "sagwa", chinese: "\u82F9\u679C", level: 1 },
      { korean: "\uBE75", romanization: "ppang", chinese: "\u9762\u5305", level: 1 },
      { korean: "\uCEE4\uD53C", romanization: "keopi", chinese: "\u5496\u5561", level: 1 },
      { korean: "\uB9DB\uC788\uC5B4\uC694", romanization: "masisseoyo", chinese: "\u597D\u5403", level: 1 },
      { korean: "\uB9E4\uC6CC\uC694", romanization: "maewoyo", chinese: "\u8FA3", level: 1 },
      { korean: "\uBC30\uACE0\uD30C\uC694", romanization: "baegopayo", chinese: "\u997F", level: 1 },
      { korean: "\uC8FC\uBB38", romanization: "jumun", chinese: "\u70B9\u9910", level: 2 },
      { korean: "\uACC4\uC0B0", romanization: "gyesan", chinese: "\u7ED3\u8D26", level: 2 },
      { korean: "\uC2DD\uB2F9", romanization: "sikdang", chinese: "\u9910\u5385", level: 1 },
      { korean: "\uBA54\uB274", romanization: "menyu", chinese: "\u83DC\u5355", level: 1 }
    ],
    sentences: [
      { korean: "\uBC25 \uBA39\uC5C8\uC5B4\uC694?", romanization: "bap meogeosseoyo?", chinese: "\u5403\u996D\u4E86\u5417\uFF1F", level: 1 },
      { korean: "\uBB3C \uC8FC\uC138\uC694.", romanization: "mul juseyo.", chinese: "\u8BF7\u7ED9\u6211\u6C34\u3002", level: 1 },
      { korean: "\uC774\uAC70 \uB9DB\uC788\uC5B4\uC694.", romanization: "igeo masisseoyo.", chinese: "\u8FD9\u4E2A\u5F88\u597D\u5403\u3002", level: 1 },
      { korean: "\uC8FC\uBB38\uD560\uAC8C\uC694.", romanization: "jumunhalgeyo.", chinese: "\u6211\u8981\u70B9\u9910\u3002", level: 2 },
      { korean: "\uACC4\uC0B0\uC11C \uC8FC\uC138\uC694.", romanization: "gyesanseo juseyo.", chinese: "\u8BF7\u7ED9\u6211\u8D26\u5355\u3002", level: 2 }
    ],
    grammar: [
      { title: "\uB9DB\uC788\uB2E4 \u2192 \uB9DB\uC788\uC5B4\uC694\uFF08\u3142 \u4E0D\u89C4\u5219\uFF09", pattern: "\u3142 + \u5143\u97F3 \u2192 \uC6B0", explanation: "\u8BCD\u5E72\u4EE5 \u3142 \u7ED3\u5C3E\u7684\u5F62\u5BB9\u8BCD\uFF0C\u9047\u5143\u97F3\u524D \u3142 \u53D8 \uC6B0\uFF1A\uB9DB\uC788\uC5B4\uC694\u3001\uACE0\uB9D9\uC2B5\uB2C8\uB2E4\u3002", example: "\uB9DB\uC788\uC5B4\uC694 / \uACE0\uB9C8\uC6CC\uC694", exampleCn: "\u597D\u5403 / \u8C22\u8C22\uFF08\u5E73\u8BED\uFF09", level: 1 },
      { title: "\uC5B4\uC694 / \uC544\uC694\uFF08\u975E\u6B63\u5F0F\u656C\u8BED\uFF09", pattern: "\u8BCD\u5E72 + \uC544\uC694 / \uC5B4\uC694", explanation: "\u52A8\u8BCD / \u5F62\u5BB9\u8BCD\u540E\u6700\u5E38\u89C1\u7684\u656C\u8BED\u7ED3\u5C3E\uFF0C\u6BD4 \u3142\uB2C8\uB2E4 \u968F\u610F\u3002", example: "\uBA39\uC5B4\uC694 / \uAC00\uC694", exampleCn: "\u5403 / \u53BB", level: 1 },
      { title: "\uC8FC\uC138\uC694\uFF08\u8BF7\u7ED9\uFF09", pattern: "\u540D\u8BCD + \uC8FC\uC138\uC694", explanation: "\u793C\u8C8C\u8BF7\u6C42\u53E5\u5F0F\u3002", example: "\uBB3C \uC8FC\uC138\uC694.", exampleCn: "\u8BF7\u7ED9\u6211\u6C34\u3002", level: 1 },
      { title: "\uC558 / \uC5C8\uC5B4\uC694\uFF08\u8FC7\u53BB\u65F6\uFF09", pattern: "\u8BCD\u5E72 + \uC558/\uC5C8 + \uC5B4\uC694", explanation: "\u8868\u793A\u8FC7\u53BB\uFF1A\uBA39 + \uC5C8 + \uC5B4\uC694 = \uBA39\uC5C8\uC5B4\uC694\uFF08\u5403\u4E86\uFF09\u3002", example: "\uBC25 \uBA39\uC5C8\uC5B4\uC694.", exampleCn: "\u5403\u996D\u4E86\u3002", level: 1 },
      { title: "\uBC30\uACE0\uD504\uB2E4 \u2192 \uBC30\uACE0\uD30C\uC694", pattern: "\u3142 \u4E0D\u89C4\u5219", explanation: "\u997F\uFF1A\u8BCD\u5E72 \uBC30\uACE0\uD504 + \uC544\uC694\uFF0C\u3142 \u53D8 \uC6B0 \u2192 \uBC30\uACE0\uD30C\uC694\u3002", example: "\uBC30\uACE0\uD30C\uC694.", exampleCn: "\u997F\u4E86\u3002", level: 1 }
    ],
    quiz: [
      { q: '"\u597D\u5403"\u600E\u4E48\u8BF4\uFF1F', options: ["\uB9DB\uC788\uC5B4\uC694", "\uB9DB\uC788\uC5B4", "\uB9DB\uC788\uB2E4\uC694"], answer: 0, explain: "\uB9DB\uC788\uB2E4 \u7684\u656C\u8BED\u662F \uB9DB\uC788\uC5B4\uC694\uFF08\u3142 \u4E0D\u89C4\u5219\uFF09\u3002" },
      { q: '"\u8BF7\u7ED9\u6211\u6C34"\u54EA\u9879\u6B63\u786E\uFF1F', options: ["\uBB3C \uC8FC\uC138\uC694", "\uBB3C \uC8FC\uC138", "\uBB3C \uC918\uC694"], answer: 0, explain: "\u8BF7\u6C42\u7528 \uC8FC\uC138\uC694\u3002" },
      { q: '\u8FC7\u53BB\u65F6"\u5403\u4E86"\u662F\uFF1F', options: ["\uBA39\uC5C8\uC5B4\uC694", "\uBA39\uC5B4\uC694", "\uBA39\uC744\uAC8C\uC694"], answer: 0, explain: "\uBA39 + \uC5C8 + \uC5B4\uC694 = \uBA39\uC5C8\uC5B4\uC694\u3002" },
      { q: '"\u8FA3"\u7684\u97E9\u8BED\u662F\uFF1F', options: ["\uB9E4\uC6CC\uC694", "\uB2EC\uC544\uC694", "\uC2DC\uC6D0\uD574\uC694"], answer: 0, explain: "\uB9E4\uC6CC\uC694 = \u8FA3\uFF1B\uB2EC\uC544\uC694 = \u751C\uFF1B\uC2DC\uC6D0\uD574\uC694 = \u51C9\u723D\u3002" },
      { q: '"\u70B9\u9910"\u7684\u97E9\u8BED\u662F\uFF1F', options: ["\uC8FC\uBB38", "\uACC4\uC0B0", "\uC2DD\uC0AC"], answer: 0, explain: "\uC8FC\uBB38 = \u70B9\u9910\uFF1B\uACC4\uC0B0 = \u7ED3\u8D26\u3002" }
    ]
  },
  // ───────────────────────── Day 5 ─────────────────────────
  {
    day: 5,
    theme: "\u65F6\u95F4\u4E0E\u65E5\u671F",
    words: [
      { korean: "\uC624\uB298", romanization: "oneul", chinese: "\u4ECA\u5929", level: 1 },
      { korean: "\uB0B4\uC77C", romanization: "naeil", chinese: "\u660E\u5929", level: 1 },
      { korean: "\uC5B4\uC81C", romanization: "eoje", chinese: "\u6628\u5929", level: 1 },
      { korean: "\uC2DC\uAC04", romanization: "sigan", chinese: "\u65F6\u95F4", level: 1 },
      { korean: "\uBD84", romanization: "bun", chinese: "\u5206\u949F", level: 1 },
      { korean: "\uC2DC", romanization: "si", chinese: "\u70B9\uFF08\u949F\uFF09", level: 1 },
      { korean: "\uC544\uCE68", romanization: "achim", chinese: "\u65E9\u4E0A", level: 1 },
      { korean: "\uC810\uC2EC", romanization: "jeomsim", chinese: "\u4E2D\u5348 / \u5348\u996D", level: 1 },
      { korean: "\uC800\uB141", romanization: "jeonyeok", chinese: "\u665A\u4E0A / \u665A\u996D", level: 1 },
      { korean: "\uC8FC\uB9D0", romanization: "jumal", chinese: "\u5468\u672B", level: 1 },
      { korean: "\uC6D4\uC694\uC77C", romanization: "woryoil", chinese: "\u5468\u4E00", level: 1 },
      { korean: "\uD1A0\uC694\uC77C", romanization: "toyoil", chinese: "\u5468\u516D", level: 1 },
      { korean: "\uC77C\uC694\uC77C", romanization: "iryoil", chinese: "\u5468\u65E5", level: 1 },
      { korean: "\uB0A0\uC9DC", romanization: "naljja", chinese: "\u65E5\u671F", level: 2 },
      { korean: "\uC5B8\uC81C", romanization: "eonje", chinese: "\u4EC0\u4E48\u65F6\u5019", level: 1 }
    ],
    sentences: [
      { korean: "\uC624\uB298 \uB0A0\uC528\uAC00 \uC88B\uC544\uC694.", romanization: "oneul nalssiga joayo.", chinese: "\u4ECA\u5929\u5929\u6C14\u5F88\u597D\u3002", level: 1 },
      { korean: "\uBA87 \uC2DC\uC608\uC694?", romanization: "myeot siyeyo?", chinese: "\u51E0\u70B9\u4E86\uFF1F", level: 1 },
      { korean: "\uB0B4\uC77C \uB9CC\uB098\uC694.", romanization: "naeil mannayo.", chinese: "\u660E\u5929\u89C1\u3002", level: 1 },
      { korean: "\uD1A0\uC694\uC77C\uC5D0 \uC26C\uC5B4\uC694.", romanization: "toyire sseoyo.", chinese: "\u5468\u516D\u4F11\u606F\u3002", level: 1 },
      { korean: "\uC5B8\uC81C \uAC08\uAE4C\uC694?", romanization: "eonje galkkayo?", chinese: "\u4EC0\u4E48\u65F6\u5019\u53BB\u5462\uFF1F", level: 1 }
    ],
    grammar: [
      { title: "\uC694\uC77C\uFF08\u661F\u671F\uFF09", pattern: "\uC6D4/\uD654/\uC218/\uBAA9/\uAE08/\uD1A0/\uC77C + \uC694\uC77C", explanation: '\u661F\u671F\u7531"\u5929\u5E72+\uC694\uC77C"\u6784\u6210\uFF1A\uC6D4\uC694\uC77C(\u4E00)\u3001\uD654\uC694\uC77C(\u4E8C)\u2026\uC77C\uC694\uC77C(\u65E5)\u3002', example: "\uD1A0\uC694\uC77C / \uC77C\uC694\uC77C", exampleCn: "\u5468\u516D / \u5468\u65E5", level: 1 },
      { title: "\uC5D0\uFF08\u65F6\u95F4\u52A9\u8BCD\uFF09", pattern: "\u65F6\u95F4 + \uC5D0", explanation: "\u52A8\u4F5C\u53D1\u751F\u7684\u65F6\u95F4\u540E\u7528 \uC5D0\u3002", example: "\uD1A0\uC694\uC77C\uC5D0 \uC26C\uC5B4\uC694.", exampleCn: "\u5468\u516D\u4F11\u606F\u3002", level: 1 },
      { title: "\uBA87 \uC2DC\uFF08\u51E0\u70B9\uFF09", pattern: "\uBA87 \uC2DC + \uC608\uC694?", explanation: "\u8BE2\u95EE\u949F\u70B9\u3002", example: "\uBA87 \uC2DC\uC608\uC694?", exampleCn: "\u51E0\u70B9\u4E86\uFF1F", level: 1 },
      { title: "\uAC08\uAE4C\uC694?\uFF08\u5171\u52A8 / \u5EFA\u8BAE\uFF09", pattern: "\u52A8\u8BCD + \u3139\uAE4C\uC694?", explanation: '\u63D0\u8BAE\u4E00\u8D77\u505A\u67D0\u4E8B\uFF1A"\u6211\u4EEC~\u5427\uFF1F"', example: "\uC5B8\uC81C \uAC08\uAE4C\uC694?", exampleCn: "\u4EC0\u4E48\u65F6\u5019\u53BB\u5462\uFF1F", level: 1 },
      { title: "\uC544\uCE68 / \uC810\uC2EC / \uC800\uB141", pattern: "\u2014", explanation: "\u4E00\u65E5\u4E09\u9910\u65F6\u6BB5\u8BCD\uFF0C\u4E5F\u6307\u65E9 / \u5348 / \u665A\u996D\u3002", example: "\uC544\uCE68\uC5D0 \uC6B4\uB3D9\uD574\uC694.", exampleCn: "\u65E9\u4E0A\u8FD0\u52A8\u3002", level: 1 }
    ],
    quiz: [
      { q: '"\u660E\u5929"\u7684\u97E9\u8BED\u662F\uFF1F', options: ["\uB0B4\uC77C", "\uC5B4\uC81C", "\uC624\uB298"], answer: 0, explain: "\uB0B4\uC77C = \u660E\u5929\uFF1B\uC5B4\uC81C = \u6628\u5929\uFF1B\uC624\uB298 = \u4ECA\u5929\u3002" },
      { q: '"\u51E0\u70B9\u4E86"\u600E\u4E48\u8BF4\uFF1F', options: ["\uBA87 \uC2DC\uC608\uC694", "\uBA87 \uC0B4\uC774\uC5D0\uC694", "\uC5B8\uC81C\uC608\uC694"], answer: 0, explain: "\uBA87 \uC2DC = \u51E0\u70B9\u3002" },
      { q: "\u661F\u671F\u516D\u662F\uFF1F", options: ["\uD1A0\uC694\uC77C", "\uC77C\uC694\uC77C", "\uC6D4\uC694\uC77C"], answer: 0, explain: "\uD1A0\uC694\uC77C = \u5468\u516D\uFF1B\uC77C\uC694\uC77C = \u5468\u65E5\uFF1B\uC6D4\uC694\uC77C = \u5468\u4E00\u3002" },
      { q: "\u52A8\u4F5C\u65F6\u95F4\u540E\u7528\u7684\u52A9\u8BCD\u662F\uFF1F", options: ["\uC5D0", "\uC5D0\uC11C", "\uC73C\uB85C"], answer: 0, explain: "\u65F6\u95F4\u52A9\u8BCD\u7528 \uC5D0\uFF08\uD1A0\uC694\uC77C\uC5D0\uFF09\u3002" },
      { q: '"\u4EC0\u4E48\u65F6\u5019\u53BB\u5462"\u8868\u8FBE\u5EFA\u8BAE\u7528\uFF1F', options: ["\uAC08\uAE4C\uC694", "\uAC00\uC694", "\uAC14\uC5B4\uC694"], answer: 0, explain: "\u3139\uAE4C\uC694 \u8868\u5EFA\u8BAE / \u5171\u52A8\u3002" }
    ]
  },
  // ───────────────────────── Day 6 ─────────────────────────
  {
    day: 6,
    theme: "\u65E5\u5E38\u4E0E\u7231\u597D",
    words: [
      { korean: "\uC6B4\uB3D9", romanization: "undong", chinese: "\u8FD0\u52A8", level: 1 },
      { korean: "\uC74C\uC545", romanization: "eumak", chinese: "\u97F3\u4E50", level: 1 },
      { korean: "\uC601\uD654", romanization: "yeonghwa", chinese: "\u7535\u5F71", level: 1 },
      { korean: "\uCC45", romanization: "chaek", chinese: "\u4E66", level: 1 },
      { korean: "\uC77D\uB2E4", romanization: "ikda", chinese: "\u8BFB", level: 1 },
      { korean: "\uB4E3\uB2E4", romanization: "deutda", chinese: "\u542C", level: 1 },
      { korean: "\uC88B\uC544\uD558\uB2E4", romanization: "joahada", chinese: "\u559C\u6B22", level: 1 },
      { korean: "\uC790\uC8FC", romanization: "jaju", chinese: "\u7ECF\u5E38", level: 1 },
      { korean: "\uAC00\uB054", romanization: "gakkeum", chinese: "\u6709\u65F6", level: 1 },
      { korean: "\uB9E4\uC77C", romanization: "maeil", chinese: "\u6BCF\u5929", level: 1 },
      { korean: "\uC77C\uCC0D", romanization: "iljjik", chinese: "\u65E9", level: 1 },
      { korean: "\uB2A6\uAC8C", romanization: "neutge", chinese: "\u665A", level: 1 },
      { korean: "\uC26C\uB2E4", romanization: "swida", chinese: "\u4F11\u606F", level: 1 },
      { korean: "\uC77C\uD558\uB2E4", romanization: "ilhada", chinese: "\u5DE5\u4F5C", level: 1 },
      { korean: "\uCDE8\uBBF8", romanization: "chwimi", chinese: "\u7231\u597D", level: 1 }
    ],
    sentences: [
      { korean: "\uCDE8\uBBF8\uAC00 \uBB50\uC608\uC694?", romanization: "chwimiga mwoyeyo?", chinese: "\u4F60\u7684\u7231\u597D\u662F\u4EC0\u4E48\uFF1F", level: 1 },
      { korean: "\uC74C\uC545 \uB4E3\uB294 \uAC83\uC744 \uC88B\uC544\uD574\uC694.", romanization: "eumak deutneun geoseul joahaeyo.", chinese: "\u6211\u559C\u6B22\u542C\u97F3\u4E50\u3002", level: 1 },
      { korean: "\uB9E4\uC77C \uC6B4\uB3D9\uD574\uC694.", romanization: "maeil undonghaeyo.", chinese: "\u6211\u6BCF\u5929\u8FD0\u52A8\u3002", level: 1 },
      { korean: "\uC8FC\uB9D0\uC5D0 \uCC45\uC744 \uC77D\uC5B4\uC694.", romanization: "jumare chaegeul ilgeoyo.", chinese: "\u5468\u672B\u6211\u770B\u4E66\u3002", level: 1 },
      { korean: "\uC77C\uCC0D \uC790\uC694.", romanization: "iljjik jayo.", chinese: "\u6211\u65E9\u7761\u3002", level: 1 }
    ],
    grammar: [
      { title: "\uD558\uB2E4 \u52A8\u8BCD", pattern: "\u6C49\u5B57\u8BCD + \uD558\uB2E4", explanation: "\u5927\u91CF\u6C49\u5B57\u8BCD + \uD558\uB2E4 \u6784\u6210\u52A8\u8BCD\uFF1A\uC6B4\uB3D9\uD558\uB2E4\u3001\uACF5\uBD80\uD558\uB2E4\u3001\uC0AC\uB791\uD558\uB2E4\u3002", example: "\uC6B4\uB3D9\uD574\uC694 / \uACF5\uBD80\uD574\uC694", exampleCn: "\u8FD0\u52A8 / \u5B66\u4E60", level: 1 },
      { title: "\uB294 \uAC83\uC744 \uC88B\uC544\uD574\uC694\uFF08\u559C\u6B22\u505A\uFF5E\uFF09", pattern: "\u52A8\u8BCD + \uB294 \uAC83 + \uC744/\uB97C + \uC88B\uC544\uD558\uB2E4", explanation: '\u628A\u52A8\u4F5C\u540D\u8BCD\u5316\u540E\u4F5C"\u559C\u6B22"\u7684\u5BBE\u8BED\u3002', example: "\uC74C\uC545 \uB4E3\uB294 \uAC83\uC744 \uC88B\uC544\uD574\uC694.", exampleCn: "\u559C\u6B22\u542C\u97F3\u4E50\u3002", level: 1 },
      { title: "\uC790\uC8FC / \uAC00\uB054 / \uB9E4\uC77C\uFF08\u9891\u7387\u526F\u8BCD\uFF09", pattern: "\u526F\u8BCD + \u52A8\u8BCD", explanation: "\u653E\u52A8\u8BCD\u524D\uFF1A\uC790\uC8FC(\u7ECF\u5E38)\u3001\uAC00\uB054(\u6709\u65F6)\u3001\uB9E4\uC77C(\u6BCF\u5929)\u3002", example: "\uB9E4\uC77C \uC6B4\uB3D9\uD574\uC694.", exampleCn: "\u6BCF\u5929\u8FD0\u52A8\u3002", level: 1 },
      { title: "\uBB50\uC608\uC694?\uFF08\u662F\u4EC0\u4E48\uFF09", pattern: "\uBB50 + \uC608\uC694?", explanation: "\uBB50 \u662F \uBB34\uC5C7\uFF08\u4EC0\u4E48\uFF09\u7684\u7F29\u7565\u3002", example: "\uCDE8\uBBF8\uAC00 \uBB50\uC608\uC694?", exampleCn: "\u7231\u597D\u662F\u4EC0\u4E48\uFF1F", level: 1 },
      { title: "\uC5B4\uC694 / \uC544\uC694 \u590D\u4E60", pattern: "\u73B0\u5728\u65F6\u656C\u8BED", explanation: "\uD558\uB2E4 \u7C7B\u8BCD\u5E72\u7528 \uD574\uC694\uFF1A\uC6B4\uB3D9\uD574\uC694\u3001\uC88B\uC544\uD574\uC694\u3002", example: "\uC88B\uC544\uD574\uC694.", exampleCn: "\u559C\u6B22\u3002", level: 1 }
    ],
    quiz: [
      { q: '"\u7231\u597D"\u7684\u97E9\u8BED\u662F\uFF1F', options: ["\uCDE8\uBBF8", "\uC6B4\uB3D9", "\uC74C\uC545"], answer: 0, explain: "\uCDE8\uBBF8 = \u7231\u597D\u3002" },
      { q: '"\u6211\u559C\u6B22\u542C\u97F3\u4E50"\u54EA\u9879\u6B63\u786E\uFF1F', options: ["\uC74C\uC545 \uB4E3\uB294 \uAC83\uC744 \uC88B\uC544\uD574\uC694", "\uC74C\uC545 \uC88B\uC544\uD574\uC694 \uB4E3\uB294", "\uC74C\uC545 \uB4E3\uAE30 \uC88B\uC544\uD574\uC694"], answer: 0, explain: "\uB4E3\uB294 \uAC83 + \uC744 + \uC88B\uC544\uD574\uC694 \u662F\u6807\u51C6\u7ED3\u6784\u3002" },
      { q: '"\u6BCF\u5929"\u7684\u97E9\u8BED\u662F\uFF1F', options: ["\uB9E4\uC77C", "\uAC00\uB054", "\uC790\uC8FC"], answer: 0, explain: "\uB9E4\uC77C = \u6BCF\u5929\uFF1B\uAC00\uB054 = \u6709\u65F6\uFF1B\uC790\uC8FC = \u7ECF\u5E38\u3002" },
      { q: '"\u4EC0\u4E48"\u7684\u7F29\u7565\u662F\uFF1F', options: ["\uBB50", "\uBB34\uC5B4", "\uBA38"], answer: 0, explain: "\uBB50 = \uBB34\uC5C7 \u7684\u7F29\u7565\u3002" },
      { q: '\uD558\uB2E4 \u52A8\u8BCD"\u5B66\u4E60"\u662F\uFF1F', options: ["\uACF5\uBD80\uD574\uC694", "\uACF5\uBD80\uC5B4\uC694", "\uACF5\uBD80\uC5EC\uC694"], answer: 0, explain: "\uACF5\uBD80\uD558\uB2E4 \u2192 \uACF5\uBD80\uD574\uC694\u3002" }
    ]
  },
  // ───────────────────────── Day 7 ─────────────────────────
  {
    day: 7,
    theme: "\u8D2D\u7269\u4E0E\u989C\u8272",
    words: [
      { korean: "\uC0C9\uAE54", romanization: "saekkkal", chinese: "\u989C\u8272", level: 1 },
      { korean: "\uBE68\uAC04\uC0C9", romanization: "ppalgansaek", chinese: "\u7EA2\u8272", level: 1 },
      { korean: "\uD30C\uB780\uC0C9", romanization: "paransaek", chinese: "\u84DD\u8272", level: 1 },
      { korean: "\uB178\uB780\uC0C9", romanization: "noransaek", chinese: "\u9EC4\u8272", level: 1 },
      { korean: "\uCD08\uB85D\uC0C9", romanization: "choroksaek", chinese: "\u7EFF\u8272", level: 1 },
      { korean: "\uD558\uC580\uC0C9", romanization: "hayansek", chinese: "\u767D\u8272", level: 1 },
      { korean: "\uAC80\uC740\uC0C9", romanization: "geomeunsaek", chinese: "\u9ED1\u8272", level: 1 },
      { korean: "\uD06C\uB2E4", romanization: "keuda", chinese: "\u5927", level: 1 },
      { korean: "\uC791\uB2E4", romanization: "jakda", chinese: "\u5C0F", level: 1 },
      { korean: "\uBE44\uC2F8\uB2E4", romanization: "bissada", chinese: "\u8D35", level: 2 },
      { korean: "\uC2F8\uB2E4", romanization: "ssada", chinese: "\u4FBF\u5B9C", level: 2 },
      { korean: "\uC0AC\uC774\uC988", romanization: "saijeu", chinese: "\u5C3A\u7801", level: 2 },
      { korean: "\uC0AC\uB2E4", romanization: "sada", chinese: "\u4E70", level: 1 },
      { korean: "\uC785\uB2E4", romanization: "iptda", chinese: "\u7A7F", level: 1 },
      { korean: "\uBC14\uAFB8\uB2E4", romanization: "bakkuda", chinese: "\u6362", level: 2 }
    ],
    sentences: [
      { korean: "\uC774\uAC70 \uC5BC\uB9C8\uC608\uC694?", romanization: "igeo eolmayeyo?", chinese: "\u8FD9\u4E2A\u591A\u5C11\u94B1\uFF1F", level: 1 },
      { korean: "\uBE68\uAC04\uC0C9\uC73C\uB85C \uC8FC\uC138\uC694.", romanization: "ppalgansaegeuro juseyo.", chinese: "\u8BF7\u7ED9\u6211\u7EA2\u8272\u7684\u3002", level: 1 },
      { korean: "\uB108\uBB34 \uBE44\uC2F8\uC694.", romanization: "neomu bissayo.", chinese: "\u592A\u8D35\u4E86\u3002", level: 2 },
      { korean: "\uC0AC\uC774\uC988\uAC00 \uC791\uC544\uC694.", romanization: "saijeuga jagayo.", chinese: "\u5C3A\u7801\u592A\u5C0F\u3002", level: 2 },
      { korean: "\uBC14\uAFD4 \uC8FC\uC138\uC694.", romanization: "bakkwo juseyo.", chinese: "\u8BF7\u5E2E\u6211\u6362\u4E00\u4E0B\u3002", level: 2 }
    ],
    grammar: [
      { title: "\uC0C9\uFF08\u989C\u8272\uFF09", pattern: "\u989C\u8272\u8BCD + \uC0C9", explanation: "\u989C\u8272\u547D\u540D\uFF1A\uBE68\uAC04(\u7EA2)+\uC0C9=\uBE68\uAC04\uC0C9\uFF1B\uD30C\uB780(\u84DD)+\uC0C9=\uD30C\uB780\uC0C9\u3002", example: "\uBE68\uAC04\uC0C9 / \uD30C\uB780\uC0C9", exampleCn: "\u7EA2\u8272 / \u84DD\u8272", level: 1 },
      { title: "\uC5BC\uB9C8\uC608\uC694?\uFF08\u591A\u5C11\u94B1\uFF09", pattern: "\uC774\uAC70 + \uC5BC\uB9C8\uC608\uC694?", explanation: "\u8D2D\u7269\u95EE\u4EF7\u5E38\u7528\u53E5\u3002", example: "\uC774\uAC70 \uC5BC\uB9C8\uC608\uC694?", exampleCn: "\u8FD9\u4E2A\u591A\u5C11\u94B1\uFF1F", level: 1 },
      { title: "\uC73C\uB85C / \uB85C \uC8FC\uC138\uC694\uFF08\u8BF7\u7ED9\uFF5E\uFF09", pattern: "\u6750\u6599 / \u65B9\u5F0F + \uC73C\uB85C/\uB85C", explanation: "\u5DE5\u5177 / \u6750\u6599\u52A9\u8BCD\uFF1A\uBE68\uAC04\uC0C9\uC73C\uB85C(\u7528\u7EA2\u8272)\u3002", example: "\uBE68\uAC04\uC0C9\uC73C\uB85C \uC8FC\uC138\uC694.", exampleCn: "\u8BF7\u7ED9\u7EA2\u8272\u7684\u3002", level: 1 },
      { title: "\uC744 / \uB97C\uFF08\u5BBE\u683C\uFF09", pattern: "\u4F53\u8BCD + \uC744 / \uB97C", explanation: "\u6807\u8BB0\u5BBE\u8BED\uFF1A\u95ED\u97F3\u8282+\uC744\uFF0C\u5F00\u97F3\u8282+\uB97C\u3002", example: "\uC774\uAC70\uB97C \uC0AC\uC694.", exampleCn: "\u4E70\u8FD9\u4E2A\u3002", level: 1 },
      { title: "\uACE0 \uC2F6\uB2E4\uFF08\u60F3\u505A\uFF5E\uFF09", pattern: "\u52A8\u8BCD + \uACE0 \uC2F6\uB2E4", explanation: "\u8868\u8FBE\u613F\u671B\uFF1A\uC0AC\uACE0 \uC2F6\uC5B4\uC694(\u60F3\u4E70)\u3002", example: "\uC0AC\uACE0 \uC2F6\uC5B4\uC694.", exampleCn: "\u60F3\u4E70\u3002", level: 2 }
    ],
    quiz: [
      { q: '"\u7EA2\u8272"\u7684\u97E9\u8BED\u662F\uFF1F', options: ["\uBE68\uAC04\uC0C9", "\uD30C\uB780\uC0C9", "\uB178\uB780\uC0C9"], answer: 0, explain: "\uBE68\uAC04\uC0C9 = \u7EA2\u8272\u3002" },
      { q: '"\u8FD9\u4E2A\u591A\u5C11\u94B1"\u600E\u4E48\u8BF4\uFF1F', options: ["\uC774\uAC70 \uC5BC\uB9C8\uC608\uC694", "\uC774\uAC70 \uBE44\uC2F8\uC694", "\uC5BC\uB9C8 \uC8FC\uC138\uC694"], answer: 0, explain: "\uC5BC\uB9C8\uC608\uC694 = \u591A\u5C11\u94B1\u3002" },
      { q: '"\u592A\u8D35\u4E86"\u662F\uFF1F', options: ["\uB108\uBB34 \uBE44\uC2F8\uC694", "\uB108\uBB34 \uC2F8\uC694", "\uBE44\uC2F8\uACE0 \uC2F6\uC5B4\uC694"], answer: 0, explain: "\uB108\uBB34 = \u592A\uFF1B\uBE44\uC2F8\uC694 = \u8D35\u3002" },
      { q: '\u6750\u6599\u52A9\u8BCD"\u7528\u7EA2\u8272"\u7528\uFF1F', options: ["\uBE68\uAC04\uC0C9\uC73C\uB85C", "\uBE68\uAC04\uC0C9\uC744", "\uBE68\uAC04\uC0C9\uC5D0"], answer: 0, explain: "\uC73C\uB85C/\uB85C \u8868\u6750\u6599 / \u65B9\u5F0F\u3002" },
      { q: '"\u60F3\u4E70"\u600E\u4E48\u8BF4\uFF1F', options: ["\uC0AC\uACE0 \uC2F6\uC5B4\uC694", "\uC0AC\uC694 \uC2F6\uC5B4\uC694", "\uC0AC\uB294 \uC2F6\uC5B4\uC694"], answer: 0, explain: "\u52A8\u8BCD + \uACE0 \uC2F6\uB2E4 \u8868\u613F\u671B\u3002" }
    ]
  }
];

// src/data/entertainment.ts
var ANIMATIONS = [
  {
    id: "anim-greet",
    title: "\u7B2C1\u8BDD \xB7 \u6253\u62DB\u547C",
    group: "\u51E0\u5398\u7C73\u52A8\u753B",
    kind: "animation",
    desc: "\u5C0F\u5154\u5B50\u51FA\u95E8\u9047\u5230\u670B\u53CB\uFF0C\u7528\u6700\u57FA\u7840\u7684\u95EE\u5019\u5F00\u542F\u4E00\u5929\u3002",
    dialogue: [
      { kr: "\uC548\uB155! \uB098\uB294 \uD1A0\uB07C\uC57C.", cn: "\u4F60\u597D\uFF01\u6211\u662F\u5C0F\u5154\u5B50\u3002" },
      { kr: "\uBB50 \uD574?", cn: "\u4F60\u5728\u5E72\u561B\uFF1F" },
      { kr: "\uAC19\uC774 \uB180\uC790!", cn: "\u4E00\u8D77\u73A9\u5427\uFF01" }
    ],
    vocab: [
      { korean: "\uC548\uB155", romanization: "annyeong", chinese: "\u4F60\u597D / \u518D\u89C1\uFF08\u5E73\u8BED\uFF09", level: 1 },
      { korean: "\uB098", romanization: "na", chinese: "\u6211", level: 1 },
      { korean: "\uB180\uB2E4", romanization: "nolda", chinese: "\u73A9", level: 1 },
      { korean: "\uAC19\uC774", romanization: "gachi", chinese: "\u4E00\u8D77", level: 1 }
    ],
    grammar: [
      { pattern: "\uB098\uB294 ~\uC57C\uFF08\u6211\u662F~\uFF09", explanation: "\u5E73\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF1A\uB098(\u6211) + \uB294(\u4E3B\u9898) + \uC774\uB984 + \uC57C\u3002", example: "\uB098\uB294 \uD1A0\uB07C\uC57C." },
      { pattern: "\uBB50 \uD574?\uFF08\u5728\u5E72\u561B\uFF09", explanation: "\uBB50=\uBB34\uC5C7(\u4EC0\u4E48)\uFF0C\uD574=\uD558\uB2E4 \u7684\u5E73\u8BED\uFF0C\u53E3\u8BED\u5E38\u7528\u3002", example: "\uBB50 \uD574?" },
      { pattern: "~\uC790\uFF08\u5171\u52A8\uFF09", explanation: '\u52A8\u8BCD\u8BCD\u5E72 + \uC790 \u8868\u793A"\u4E00\u8D77\u505A\u5427"\uFF0C\u6BD4 \uAC08\uAE4C\uC694 \u66F4\u968F\u610F\u3002', example: "\uAC19\uC774 \uB180\uC790!" }
    ],
    culture: "\u97E9\u56FD\u52A8\u753B/\u513F\u6B4C\u91CC\u5BF9\u670B\u53CB\u90FD\u7528\u5E73\u8BED(\uBC18\uB9D0)\uFF0C\u4F46\u73B0\u5B9E\u4E2D\u5BF9\u957F\u8F88\u5FC5\u987B\u7528\u656C\u8BED \uC548\uB155\uD558\uC138\uC694\u3002",
    searchQuery: "\u51E0\u5398\u7C73\u52A8\u753B \u97E9\u8BED \u6253\u62DB\u547C"
  },
  {
    id: "anim-thanks",
    title: "\u7B2C2\u8BDD \xB7 \u8BF4\u8C22\u8C22\u4E0E\u5BF9\u4E0D\u8D77",
    group: "\u51E0\u5398\u7C73\u52A8\u753B",
    kind: "animation",
    desc: "\u5C0F\u718A\u5E2E\u4E86\u5FD9\uFF0C\u5B66\u4F1A\u8BF4\u8C22\u8C22\uFF1B\u4E0D\u5C0F\u5FC3\u649E\u5230\u670B\u53CB\uFF0C\u5B66\u4F1A\u8BF4\u5BF9\u4E0D\u8D77\u3002",
    dialogue: [
      { kr: "\uACE0\uB9C8\uC6CC!", cn: "\u8C22\u8C22\uFF01" },
      { kr: "\uBBF8\uC548\uD574.", cn: "\u5BF9\u4E0D\u8D77\u3002" },
      { kr: "\uCC9C\uB9CC\uC5D0.", cn: "\u4E0D\u5BA2\u6C14\u3002" }
    ],
    vocab: [
      { korean: "\uACE0\uB9D9\uB2E4", romanization: "gomapda", chinese: "\u8C22\u8C22\uFF08\u8BCD\u6839\uFF09", level: 1 },
      { korean: "\uBBF8\uC548\uD558\uB2E4", romanization: "mianhada", chinese: "\u5BF9\u4E0D\u8D77", level: 1 },
      { korean: "\uCC9C\uB9CC\uC5D0", romanization: "cheonmane", chinese: "\u4E0D\u5BA2\u6C14", level: 1 }
    ],
    grammar: [
      { pattern: "\uACE0\uB9C8\uC6CC\uFF08\u8C22\u8C22\xB7\u5E73\u8BED\uFF09", explanation: "\uACE0\uB9D9\uB2E4 \u7684\u5E73\u8BED\u611F\u53F9\u5F62\uFF1B\u656C\u8BED\u662F \uACE0\uB9D9\uC2B5\uB2C8\uB2E4 / \uAC10\uC0AC\uD569\uB2C8\uB2E4\u3002", example: "\uACE0\uB9C8\uC6CC!" },
      { pattern: "\uBBF8\uC548\uD574\uFF08\u5BF9\u4E0D\u8D77\xB7\u5E73\u8BED\uFF09", explanation: "\uBBF8\uC548\uD558\uB2E4 \u7684\u5E73\u8BED\uFF1B\u656C\u8BED\u662F \uC8C4\uC1A1\uD569\uB2C8\uB2E4\u3002", example: "\uBBF8\uC548\uD574." },
      { pattern: "\uCC9C\uB9CC\uC5D0\uFF08\u4E0D\u5BA2\u6C14\uFF09", explanation: "\u5BF9\u8C22\u8C22\u7684\u793C\u8C8C\u56DE\u5E94\uFF0C\u4E66\u9762/\u53E3\u8BED\u90FD\u7528\u3002", example: "\uCC9C\uB9CC\uC5D0." }
    ],
    culture: '\u5BF9\u957F\u8F88\u8BF4"\u8C22\u8C22"\u8981\u7528 \uAC10\uC0AC\uD569\uB2C8\uB2E4\uFF1B\u670B\u53CB\u95F4 \uACE0\uB9C8\uC6CC \u5373\u53EF\u3002',
    searchQuery: "\u51E0\u5398\u7C73\u52A8\u753B \u8C22\u8C22 \u5BF9\u4E0D\u8D77"
  },
  {
    id: "anim-feel",
    title: "\u7B2C3\u8BDD \xB7 \u8868\u8FBE\u60C5\u7EEA",
    group: "\u51E0\u5398\u7C73\u52A8\u753B",
    kind: "animation",
    desc: "\u62FF\u5230\u793C\u7269\u5F88\u5F00\u5FC3\uFF0C\u4E0B\u96E8\u4E0D\u80FD\u51FA\u53BB\u73A9\u6709\u70B9\u96BE\u8FC7\u3002",
    dialogue: [
      { kr: "\uAE30\uBED0!", cn: "\u597D\u5F00\u5FC3\uFF01" },
      { kr: "\uC2AC\uD37C\u2026", cn: "\u597D\u96BE\u8FC7\u2026" },
      { kr: "\uD654\uB0AC\uC5B4.", cn: "\u6211\u751F\u6C14\u4E86\u3002" }
    ],
    vocab: [
      { korean: "\uAE30\uC058\uB2E4", romanization: "gippeuda", chinese: "\u9AD8\u5174", level: 1 },
      { korean: "\uC2AC\uD504\uB2E4", romanization: "seulpeuda", chinese: "\u60B2\u4F24", level: 2 },
      { korean: "\uD654\uB098\uB2E4", romanization: "hwanada", chinese: "\u751F\u6C14", level: 2 }
    ],
    grammar: [
      { pattern: "\uAE30\uBED0!\uFF08\u5F00\u5FC3\xB7\u611F\u53F9\uFF09", explanation: "\uAE30\uC058\uB2E4 \u9047 \uC544/\uC5B4\uC694 \u2192 \uAE30\uBED0\uFF0C\u611F\u53F9\u65F6\u7701\u7565\uC694\u3002", example: "\uAE30\uBED0!" },
      { pattern: "\uC2AC\uD37C\u2026\uFF08\u96BE\u8FC7\xB7\u7701\u7565\uFF09", explanation: "\uC2AC\uD504\uB2E4 \u2192 \uC2AC\uD37C\uFF0C\u53E5\u5C3E\u62D6\u957F\u8868\u793A\u59D4\u5C48\u3002", example: "\uC2AC\uD37C\u2026" },
      { pattern: "\uD654\uB0AC\uC5B4\uFF08\u751F\u6C14\u4E86\uFF09", explanation: "\uD654\uB098\uB2E4 \u8FC7\u53BB\u65F6\u5E73\u8BED\uFF1A\uD654\uB098 + \uC558 + \uC5B4 = \uD654\uB0AC\uC5B4\u3002", example: "\uD654\uB0AC\uC5B4." }
    ],
    culture: "\u97E9\u56FD\u4EBA\u8868\u8FBE\u60C5\u7EEA\u5F88\u4E30\u5BCC\uFF0C\u8BED\u6C14\u8BCD(\uC5B4~, \uC544~)\u914D\u5408\u8868\u60C5\u662F\u65E5\u5E38\u4EA4\u6D41\u7684\u4E00\u90E8\u5206\u3002",
    searchQuery: "\u51E0\u5398\u7C73\u52A8\u753B \u60C5\u7EEA \u5F00\u5FC3"
  },
  {
    id: "anim-eat",
    title: "\u7B2C4\u8BDD \xB7 \u5403\u996D\u5566",
    group: "\u51E0\u5398\u7C73\u52A8\u753B",
    kind: "animation",
    desc: "\u996D\u70B9\u5230\u4E86\uFF0C\u5C0F\u52A8\u7269\u4EEC\u56F4\u5750\u4E00\u8D77\u5403\u996D\u3002",
    dialogue: [
      { kr: "\uBC25 \uBA39\uC790!", cn: "\u5403\u996D\u5427\uFF01" },
      { kr: "\uB9DB\uC788\uC5B4!", cn: "\u597D\u5403\uFF01" },
      { kr: "\uBC30\uBD88\uB7EC.", cn: "\u5403\u9971\u4E86\u3002" }
    ],
    vocab: [
      { korean: "\uBC25", romanization: "bap", chinese: "\u996D", level: 1 },
      { korean: "\uB9DB\uC788\uB2E4", romanization: "masitda", chinese: "\u597D\u5403", level: 1 },
      { korean: "\uBC30\uBD80\uB974\uB2E4", romanization: "baebureuda", chinese: "\u9971", level: 1 }
    ],
    grammar: [
      { pattern: "\uBC25 \uBA39\uC790\uFF08\u5403\u996D\u5427\uFF09", explanation: '\uBA39\uB2E4(\u5403) + \uC790 \u5171\u52A8\uFF1B\u97E9\u56FD\u4EBA\u5E38\u7528"\uBC25 \uBA39\uC790"\u7EA6\u996D\u3002', example: "\uBC25 \uBA39\uC790!" },
      { pattern: "\uB9DB\uC788\uC5B4\uFF08\u597D\u5403\xB7\u5E73\u8BED\uFF09", explanation: "\uB9DB\uC788\uB2E4 \u2192 \uB9DB\uC788\uC5B4\uFF08\u3142\u4E0D\u89C4\u5219\uFF09\uFF0C\u611F\u53F9\u7701\uC694\u3002", example: "\uB9DB\uC788\uC5B4!" },
      { pattern: "\uBC30\uBD88\uB7EC\uFF08\u9971\u4E86\uFF09", explanation: "\uBC30\uBD80\uB974\uB2E4 \u5E73\u8BED\uFF1B\u656C\u8BED \uBC30\uBD80\uB985\uB2C8\uB2E4\u3002", example: "\uBC30\uBD88\uB7EC." }
    ],
    culture: '"\uBC25 \uBA39\uC5C8\uC5B4?(\u5403\u996D\u4E86\u5417)"\u662F\u97E9\u56FD\u4EBA\u6700\u5E38\u7528\u7684\u5173\u5FC3\u95EE\u5019\uFF0C\u7C7B\u4F3C"\u5403\u4E86\u5417"\u3002',
    searchQuery: "\u51E0\u5398\u7C73\u52A8\u753B \u5403\u996D \u597D\u5403"
  },
  {
    id: "anim-sleep",
    title: "\u7B2C5\u8BDD \xB7 \u665A\u5B89",
    group: "\u51E0\u5398\u7C73\u52A8\u753B",
    kind: "animation",
    desc: "\u591C\u6DF1\u4E86\uFF0C\u5C0F\u4F19\u4F34\u4EEC\u4E92\u9053\u665A\u5B89\u3002",
    dialogue: [
      { kr: "\uC798 \uC790!", cn: "\u665A\u5B89\uFF01" },
      { kr: "\uAFC8 \uAFD4.", cn: "\u505A\u4E2A\u597D\u68A6\u3002" },
      { kr: "\uD53C\uACE4\uD558\uB124.", cn: "\u597D\u7D2F\u5440\u3002" }
    ],
    vocab: [
      { korean: "\uC790\uB2E4", romanization: "jada", chinese: "\u7761", level: 1 },
      { korean: "\uAFC8", romanization: "kkum", chinese: "\u68A6", level: 1 },
      { korean: "\uD53C\uACE4\uD558\uB2E4", romanization: "pigonhada", chinese: "\u7D2F", level: 1 }
    ],
    grammar: [
      { pattern: "\uC798 \uC790\uFF08\u665A\u5B89\xB7\u5E73\u8BED\uFF09", explanation: "\uC790\uB2E4(\u7761) \u547D\u4EE4\u5F0F\u5E73\u8BED\uFF1B\u656C\u8BED \uC798 \uC790\uC694 / \uC798 \uC790\uC694. \u5BF9\u957F\u8F88\u7528 \uC798 \uC790\uC694\u3002", example: "\uC798 \uC790!" },
      { pattern: "\uAFC8 \uAFD4\uFF08\u505A\u68A6\xB7\u5E73\u8BED\uFF09", explanation: '\uAFC8(\u68A6) + \uAFB8\uB2E4(\u505A) \u547D\u4EE4\u5F0F\uFF1B\u5B8C\u6574\u662F"\uC88B\uC740 \uAFC8 \uAFD4"(\u505A\u4E2A\u597D\u68A6)\u3002', example: "\uAFC8 \uAFD4." },
      { pattern: "\uD53C\uACE4\uD558\uB124\uFF08\u597D\u7D2F\u5440\uFF09", explanation: "\uD53C\uACE4\uD558\uB2E4 + ~\uB124 \u8868\u793A\u611F\u53F9/\u65B0\u53D1\u73B0\u3002", example: "\uD53C\uACE4\uD558\uB124." }
    ],
    culture: '\u97E9\u56FD\u4EBA\u7761\u524D\u5E38\u4E92\u53D1"\uC798 \uC790\uC694"\uFF0C\u662F\u6E29\u67D4\u7684\u793E\u4EA4\u4E60\u60EF\u3002',
    searchQuery: "\u51E0\u5398\u7C73\u52A8\u753B \u665A\u5B89 \u7761\u89C9"
  },
  {
    id: "anim-weather",
    title: "\u7B2C6\u8BDD \xB7 \u5929\u6C14",
    group: "\u51E0\u5398\u7C73\u52A8\u753B",
    kind: "animation",
    desc: "\u7A97\u5916\u4E0B\u96E8\u53C8\u653E\u6674\uFF0C\u5C0F\u52A8\u7269\u4EEC\u804A\u8D77\u5929\u6C14\u3002",
    dialogue: [
      { kr: "\uBE44 \uC628\uB2E4.", cn: "\u4E0B\u96E8\u4E86\u3002" },
      { kr: "\uB0A0\uC528 \uC88B\uB2E4!", cn: "\u5929\u6C14\u771F\u597D\uFF01" },
      { kr: "\uCD94\uC6CC.", cn: "\u597D\u51B7\u3002" }
    ],
    vocab: [
      { korean: "\uBE44", romanization: "bi", chinese: "\u96E8", level: 1 },
      { korean: "\uB0A0\uC528", romanization: "nalssi", chinese: "\u5929\u6C14", level: 1 },
      { korean: "\uCDA5\uB2E4", romanization: "chupda", chinese: "\u51B7", level: 1 }
    ],
    grammar: [
      { pattern: "\uBE44 \uC628\uB2E4\uFF08\u4E0B\u96E8\uFF09", explanation: "\uBE44(\u96E8) + \uC624\uB2E4(\u6765)\uFF1B\uC628\uB2E4 \u662F \uC624\uB2E4 \u7684\u9648\u8FF0\u5F62\u3002", example: "\uBE44 \uC628\uB2E4." },
      { pattern: "\uB0A0\uC528 \uC88B\uB2E4\uFF08\u5929\u6C14\u597D\uFF09", explanation: "\uC88B\uB2E4(\u597D) \u63CF\u8FF0\u5929\u6C14\uFF1B\u656C\u8BED \uB0A0\uC528\uAC00 \uC88B\uC544\uC694\u3002", example: "\uB0A0\uC528 \uC88B\uB2E4!" },
      { pattern: "\uCD94\uC6CC\uFF08\u51B7\xB7\u5E73\u8BED\uFF09", explanation: "\uCDA5\uB2E4 \u2192 \uCD94\uC6CC\uFF08\u3142\u4E0D\u89C4\u5219\uFF09\u3002", example: "\uCD94\uC6CC." }
    ],
    culture: '\u97E9\u56FD\u56DB\u5B63\u5206\u660E\uFF0C\u804A\u5929\u6C14\u662F\u5F00\u542F\u8BDD\u9898\u7684\u5B89\u5168\u9009\u62E9\uFF0C\u7C7B\u4F3C"\u4ECA\u5929\u633A\u51B7\u554A"\u3002',
    searchQuery: "\u51E0\u5398\u7C73\u52A8\u753B \u5929\u6C14 \u4E0B\u96E8"
  }
];
var KPOP = [
  {
    id: "kpop-cortis",
    title: "Cortis \xB7 \u65B0\u4EBA\u7537\u56E2\u767B\u573A",
    group: "Cortis",
    kind: "kpop",
    desc: "HYBE \u65D7\u4E0B\u65B0\u4EBA\u7537\u56E2 Cortis \u7684\u81EA\u6211\u4ECB\u7ECD\u4E0E\u51FA\u9053\u821E\u53F0\u3002",
    dialogue: [
      { kr: "\uC548\uB155\uD558\uC138\uC694, \uCF54\uB974\uD2B8\uC785\uB2C8\uB2E4!", cn: "\u5927\u5BB6\u597D\uFF0C\u6211\u4EEC\u662F Cortis\uFF01" },
      { kr: "\uC800\uD76C \uB178\uB798 \uB4E4\uC5B4\uC8FC\uC138\uC694.", cn: "\u8BF7\u542C\u6211\u4EEC\u7684\u6B4C\u3002" }
    ],
    vocab: [
      { korean: "\uCF54\uB974\uD2B8", romanization: "koreuteu", chinese: "Cortis\uFF08\u56E2\u540D\uFF09", level: 2 },
      { korean: "\uC2E0\uC778", romanization: "sinin", chinese: "\u65B0\u4EBA", level: 2 },
      { korean: "\uB178\uB798", romanization: "norae", chinese: "\u6B4C", level: 1 },
      { korean: "\uBB34\uB300", romanization: "mudae", chinese: "\u821E\u53F0", level: 3 }
    ],
    grammar: [
      { pattern: "~\uC785\uB2C8\uB2E4\uFF08\u662F\xB7\u6B63\u5F0F\uFF09", explanation: "\u56E2\u4F53\u540D + \uC785\uB2C8\uB2E4 \u505A\u6B63\u5F0F\u81EA\u6211\u4ECB\u7ECD\uFF0C\u821E\u53F0/\u91C7\u8BBF\u65F6\u5FC5\u7528\u3002", example: "\uCF54\uB974\uD2B8\uC785\uB2C8\uB2E4." },
      { pattern: "\uC800\uD76C\uFF08\u6211\u4EEC\xB7\u8C26\u8BA9\uFF09", explanation: "\u5BF9\u7C89\u4E1D/\u955C\u5934\u7528 \uC800\uD76C(\u6211\u4EEC) \u6BD4 \uC6B0\uB9AC \u66F4\u8C26\u900A\u6709\u793C\u3002", example: "\uC800\uD76C \uB178\uB798" }
    ],
    culture: 'Cortis \u662F HYBE 2025 \u5E74\u63A8\u51FA\u7684\u65B0\u4EBA\u7537\u56E2\uFF0C\u6210\u5458\u4EB2\u81EA\u53C2\u4E0E\u4F5C\u8BCD\u4F5C\u66F2\uFF0C\u8D70"\u97F3\u4E50\u4EBA\u5076\u50CF"\u8DEF\u7EBF\u3002',
    searchQuery: "Cortis \uCF54\uB974\uD2B8 \uC704\uBC84\uC2A4"
  },
  {
    id: "kpop-exo",
    title: "EXO \xB7 \u4E94\u4EBA\u65F6\u671F\u56E2\u7EFC",
    group: "EXO\uFF08\u4E94\u4EBA\uFF09",
    kind: "kpop",
    desc: "\u73B0\u4EE5 SUHO\u3001Baekhyun\u3001Chanyeol\u3001Kai\u3001Sehun \u4E94\u4EBA\u6D3B\u52A8\u4E3A\u4E3B\u7684\u56E2\u7EFC\u4E0E\u7EFC\u827A\u7247\u6BB5\u3002",
    dialogue: [
      { kr: "\uC6B0\uB9AC\uB294 EXO\uC785\uB2C8\uB2E4.", cn: "\u6211\u4EEC\u662F EXO\u3002" },
      { kr: "\uD56D\uC0C1 \uC751\uC6D0\uD574\uC918\uC11C \uACE0\uB9C8\uC6CC\uC694.", cn: "\u4E00\u76F4\u5E94\u63F4\u6211\u4EEC\uFF0C\u8C22\u8C22\u3002" }
    ],
    vocab: [
      { korean: "EXO", romanization: "ekso", chinese: "EXO\uFF08\u56E2\u540D\uFF09", level: 2 },
      { korean: "\uBA64\uBC84", romanization: "membeo", chinese: "\u6210\u5458", level: 2 },
      { korean: "\uC751\uC6D0", romanization: "eungwon", chinese: "\u5E94\u63F4", level: 2 },
      { korean: "\uD32C", romanization: "paen", chinese: "\u7C89\u4E1D", level: 2 }
    ],
    grammar: [
      { pattern: "\uC6B0\uB9AC\uB294 ~\uC785\uB2C8\uB2E4", explanation: "\uC6B0\uB9AC(\u6211\u4EEC) + \uB294(\u4E3B\u9898) + \u56E2\u540D + \uC785\uB2C8\uB2E4\u3002", example: "\uC6B0\uB9AC\uB294 EXO\uC785\uB2C8\uB2E4." },
      { pattern: "\uACE0\uB9C8\uC6CC\uC694\uFF08\u8C22\u8C22\xB7\u656C\u8BED\uFF09", explanation: "\u5BF9\u7C89\u4E1D\u7528\u656C\u8BED \uACE0\uB9C8\uC6CC\uC694 / \uAC10\uC0AC\uD569\uB2C8\uB2E4\u3002", example: "\uACE0\uB9C8\uC6CC\uC694." }
    ],
    culture: 'EXO \u73B0\u4EE5\u4E94\u4EBA\uFF08SUHO\u3001Baekhyun\u3001Chanyeol\u3001Kai\u3001Sehun\uFF09\u4E3A\u4E3B\u5F00\u5C55\u6D3B\u52A8\uFF0C\u7C89\u4E1D\u540D\u4E3A"EXO-L"\u3002',
    searchQuery: "EXO \u4E94\u4EBA \u56E2\u7EFC \u7EFC\u827A"
  },
  {
    id: "kpop-txt",
    title: "TXT \xB7 \u4E0E MOA \u7684\u4E92\u52A8",
    group: "TXT",
    kind: "kpop",
    desc: "Tomorrow X Together \u5728\u76F4\u64AD/\u7B7E\u552E\u4E2D\u5BF9\u7C89\u4E1D MOA \u8BF4\u7684\u6696\u5FC3\u8BDD\u3002",
    dialogue: [
      { kr: "\uC548\uB155\uD558\uC138\uC694, \uD22C\uBAA8\uB85C\uC6B0 \uBC14\uC774 \uD22C\uAC8C\uB354\uC785\uB2C8\uB2E4.", cn: "\u5927\u5BB6\u597D\uFF0C\u6211\u4EEC\u662F Tomorrow X Together\u3002" },
      { kr: "MOA \uC0AC\uB791\uD574\uC694!", cn: "\u7231 MOA\uFF01" }
    ],
    vocab: [
      { korean: "TXT", romanization: "ti-ek-seu-ti", chinese: "Tomorrow X Together", level: 2 },
      { korean: "MOA", romanization: "moa", chinese: "TXT \u7C89\u4E1D\u540D", level: 2 },
      { korean: "\uC0AC\uB791", romanization: "sarang", chinese: "\u7231", level: 1 },
      { korean: "\uB298", romanization: "neul", chinese: "\u603B\u662F", level: 2 }
    ],
    grammar: [
      { pattern: "\uC548\uB155\uD558\uC138\uC694, ~\uC785\uB2C8\uB2E4", explanation: "\u6B63\u5F0F\u767B\u573A\u95EE\u5019\u7684\u56FA\u5B9A\u53E5\u5F0F\uFF0C\u7EFC\u827A/\u76F4\u64AD\u5F00\u5934\u5FC5\u8BF4\u3002", example: "\uD22C\uBAA8\uB85C\uC6B0 \uBC14\uC774 \uD22C\uAC8C\uB354\uC785\uB2C8\uB2E4." },
      { pattern: "\uC0AC\uB791\uD574\uC694\uFF08\u7231\xB7\u656C\u8BED\uFF09", explanation: "\uC0AC\uB791\uD558\uB2E4 \u656C\u8BED\uFF1B\u5BF9\u7C89\u4E1D\u5E38\u8BF4 \uC0AC\uB791\uD574\uC694 / \uC0AC\uB791\uD569\uB2C8\uB2E4\u3002", example: "MOA \uC0AC\uB791\uD574\uC694!" }
    ],
    culture: 'TXT \u5168\u79F0 Tomorrow X Together\uFF0C\u7C89\u4E1D\u540D MOA \u610F\u4E3A"Moments of Alwaysness"\uFF1B\u4ED6\u4EEC\u5E38\u7528 "\uB298 \uACE0\uB9C8\uC6CC\uC694" \u611F\u8C22\u7C89\u4E1D\u3002',
    searchQuery: "TXT MOA \uC704\uBC84\uC2A4 \uB77C\uC774\uBE0C"
  },
  {
    id: "kpop-lovefan",
    title: "\u901A\u7528 \xB7 \u7231\u7C89\u4E1D\u7684\u544A\u767D",
    group: "\u7537\u56E2\u901A\u7528",
    kind: "kpop",
    desc: "\u5404\u56E2\u5728\u5B89\u53EF/\u83B7\u5956\u611F\u8A00\u91CC\u9AD8\u9891\u51FA\u73B0\u7684\u544A\u767D\u53E5\u5F0F\uFF0C\u5B66\u4F1A\u4E86\u5230\u5904\u90FD\u80FD\u7528\u3002",
    dialogue: [
      { kr: "\uC6B0\uB9AC \uD32C\uB4E4 \uC815\uB9D0 \uACE0\uB9C8\uC6CC\uC694.", cn: "\u6211\u4EEC\u7684\u7C89\u4E1D\u771F\u7684\u8C22\u8C22\u4F60\u4EEC\u3002" },
      { kr: "\uD56D\uC0C1 \uACC1\uC5D0 \uC788\uC5B4\uC918\uC11C \uACE0\uB9C8\uC6CC\uC694.", cn: "\u4E00\u76F4\u966A\u5728\u8EAB\u8FB9\uFF0C\u8C22\u8C22\u3002" }
    ],
    vocab: [
      { korean: "\uD32C", romanization: "paen", chinese: "\u7C89\u4E1D", level: 2 },
      { korean: "\uACC1", romanization: "gyeot", chinese: "\u8EAB\u8FB9", level: 3 },
      { korean: "\uC815\uB9D0", romanization: "jeongmal", chinese: "\u771F\u7684", level: 1 },
      { korean: "\uB298", romanization: "neul", chinese: "\u603B\u662F", level: 2 }
    ],
    grammar: [
      { pattern: "\uC815\uB9D0 \uACE0\uB9C8\uC6CC\uC694\uFF08\u771F\u7684\u5F88\u611F\u8C22\uFF09", explanation: "\uC815\uB9D0(\u771F\u7684) \u5F3A\u8C03\u7A0B\u5EA6\uFF0C\u914D \uACE0\uB9C8\uC6CC\uC694 \u8868\u6DF1\u60C5\u3002", example: "\uC815\uB9D0 \uACE0\uB9C8\uC6CC\uC694." },
      { pattern: "~\uC5B4\uC918\uC11C\uFF08\u56E0\u4E3A~\u6240\u4EE5\u611F\u8C22\uFF09", explanation: '\uC11C \u8868\u539F\u56E0\uFF0C\uC918\uC11C \u6765\u81EA \uC8FC\uB2E4\uFF1B"\u56E0\u4E3A\u4F60~\u6240\u4EE5\u8C22\u8C22"\u3002', example: "\uACC1\uC5D0 \uC788\uC5B4\uC918\uC11C \uACE0\uB9C8\uC6CC\uC694." }
    ],
    culture: '\u97E9\u56FD\u5076\u50CF\u6587\u5316\u91CC"\u7C89\u4E1D\u5E94\u63F4"\u662F\u53CC\u5411\u7684\uFF0C\u5076\u50CF\u5E38\u5728\u5B89\u53EF\u73AF\u8282\u5355\u819D\u8DEA\u5730\u8BFB\u624B\u5199\u4FE1\uFF0C\u662F\u975E\u5E38\u52A8\u4EBA\u7684\u4F20\u7EDF\u3002',
    searchQuery: "\u7537\u56E2 \u5B89\u53EF \u611F\u8C22\u7C89\u4E1D \u540D\u573A\u9762"
  }
];
var DRAMAS = [
  {
    id: "drama-watermelon",
    title: "\u95EA\u70C1\u7684\u897F\u74DC \xB7 \u9752\u6625\u544A\u767D",
    group: "\u95EA\u70C1\u7684\u897F\u74DC",
    kind: "drama",
    desc: "\u7A7F\u8D8A\u9898\u6750\u9752\u6625\u5267\uFF0C\u7537\u4E3B\u5BF9\u5973\u4E3B\u9F13\u8D77\u52C7\u6C14\u8BF4\u51FA\u7684\u90A3\u53E5\u544A\u767D\u3002",
    dialogue: [
      { kr: "\uB108\uB97C \uC88B\uC544\uD574.", cn: "\u6211\u559C\u6B22\u4F60\u3002" },
      { kr: "\uC74C\uC545\uC774 \uC6B0\uB9AC\uB97C \uC774\uC5B4\uC92C\uC5B4.", cn: "\u662F\u97F3\u4E50\u628A\u6211\u4EEC\u8FDE\u5728\u4E86\u4E00\u8D77\u3002" }
    ],
    vocab: [
      { korean: "\uC88B\uC544\uD558\uB2E4", romanization: "joahada", chinese: "\u559C\u6B22", level: 1 },
      { korean: "\uC74C\uC545", romanization: "eumak", chinese: "\u97F3\u4E50", level: 1 },
      { korean: "\uC2DC\uAC04", romanization: "sigan", chinese: "\u65F6\u95F4", level: 1 },
      { korean: "\uC774\uC5B4\uC8FC\uB2E4", romanization: "ieojuda", chinese: "\u8FDE\u63A5", level: 3 }
    ],
    grammar: [
      { pattern: "\uB108\uB97C \uC88B\uC544\uD574\uFF08\u559C\u6B22\u4F60\uFF09", explanation: "\uB108(\u4F60) + \uB97C(\u5BBE\u683C) + \uC88B\uC544\uD558\uB2E4\uFF1B\u5E73\u8BED\u544A\u767D\u5E38\u7528\u3002", example: "\uB108\uB97C \uC88B\uC544\uD574." },
      { pattern: "~\uC544/\uC5B4\uC694\uFF08\u5E73\u8BED\u9648\u8FF0\uFF09", explanation: "\u5267\u60C5/\u670B\u53CB\u95F4\u7528\u5E73\u8BED\uFF1B\u5BF9\u957F\u8F88\u624D\u7528 \uC694 \u656C\u8BED\u3002", example: "\uC774\uC5B4\uC92C\uC5B4." }
    ],
    culture: "\u300A\u95EA\u70C1\u7684\u897F\u74DC\u300B(\uBC18\uC9DD\uC774\uB294 \uC6CC\uD130\uBA5C\uB860) \u662F 2023 \u5E74 tvN \u7A7F\u8D8A\u9752\u6625\u5267\uFF0C\u4EE5\u4E50\u961F\u4E0E1995\u5E74\u4E3A\u80CC\u666F\uFF0C\u539F\u58F0\u5E26(OST)\u6781\u53D7\u6B22\u8FCE\u3002",
    searchQuery: "\u95EA\u70C1\u7684\u897F\u74DC \u540D\u573A\u9762 \u53F0\u8BCD"
  },
  {
    id: "drama-goong",
    title: "\u5BAB \xB7 \u5BAB\u5EF7\u656C\u8BED",
    group: "\u5BAB",
    kind: "drama",
    desc: "\u5E73\u6C11\u5C11\u5973\u5AC1\u5165\u7687\u5BA4\uFF0C\u5B66\u4E60\u5982\u4F55\u4F7F\u7528\u5BAB\u5EF7\u656C\u8BED\u3002",
    dialogue: [
      { kr: "\uD669\uD0DC\uC790\uC804\uD558, \uC548\uB155\uD558\uC2ED\uB2C8\uAE4C.", cn: "\u7687\u592A\u5B50\u6BBF\u4E0B\uFF0C\u60A8\u597D\u3002" },
      { kr: "\uAD81\uAD90\uC740 \uCC38 \uC544\uB984\uB2E4\uC6CC\uC694.", cn: "\u5BAB\u6BBF\u771F\u7F8E\u3002" }
    ],
    vocab: [
      { korean: "\uD669\uD0DC\uC790", romanization: "hwangtaeja", chinese: "\u7687\u592A\u5B50", level: 3 },
      { korean: "\uC804\uD558", romanization: "jeonha", chinese: "\u6BBF\u4E0B", level: 3 },
      { korean: "\uAD81\uAD90", romanization: "gung-gwol", chinese: "\u5BAB\u6BBF", level: 3 },
      { korean: "\uC544\uB984\uB2F5\uB2E4", romanization: "areumdapda", chinese: "\u7F8E\u4E3D", level: 2 }
    ],
    grammar: [
      { pattern: "\uC548\uB155\uD558\uC2ED\uB2C8\uAE4C\uFF08\u60A8\u60A8\u597D\xB7\u6700\u9AD8\u656C\u8BED\uFF09", explanation: "\uC2ED\uB2C8\uAE4C \u662F \uD558\uC2ED\uB2C8\uB2E4 \u7684\u7591\u95EE\u5F62\uFF0C\u5BF9\u7687\u5BA4/\u6781\u5C0A\u8D35\u8005\u4F7F\u7528\u3002", example: "\uC548\uB155\uD558\uC2ED\uB2C8\uAE4C." },
      { pattern: "~\uC5B4\uC694\uFF08\u656C\u8BED\u63CF\u8FF0\uFF09", explanation: "\uC544\uB984\uB2F5\uB2E4 \u2192 \uC544\uB984\uB2E4\uC6CC\uC694\uFF0C\u793C\u8C8C\u63CF\u8FF0\u3002", example: "\uC544\uB984\uB2E4\uC6CC\uC694." }
    ],
    culture: '\u300A\u5BAB\u300B(\uAD81) \u662F 2006 \u5E74 MBC cult \u97E9\u5267\uFF0C\u8BBE\u5B9A\u5728\u97E9\u56FD\u4ECD\u4E3A\u541B\u4E3B\u5236\u7684\u5E73\u884C\u4E16\u754C\uFF1B\u5267\u4E2D\u656C\u8BED\u7B49\u7EA7\u6781\u5206\u660E\uFF0C\u662F\u5B66"\u5C0A\u5F85\u79F0"\u7684\u597D\u7D20\u6750\u3002',
    searchQuery: "\u97E9\u5267 \u5BAB \u53F0\u8BCD \u7687\u592A\u5B50"
  },
  {
    id: "drama-demon",
    title: "\u4E0E\u6076\u9B54\u6709\u7EA6 \xB7 \u5951\u7EA6\u7F57\u66FC\u53F2",
    group: "\u4E0E\u6076\u9B54\u6709\u7EA6",
    kind: "drama",
    desc: "\u8D22\u9600\u7EE7\u627F\u5973\u4E0E\u6076\u9B54\u7B7E\u8BA2\u5951\u7EA6\uFF0C\u6B65\u6B65\u6CA6\u9677\u7684\u53F0\u8BCD\u3002",
    dialogue: [
      { kr: "\uACC4\uC57D\uD574\uC694.", cn: "\u6211\u4EEC\u7B7E\u5951\u7EA6\u5427\u3002" },
      { kr: "\uC6B4\uBA85\uC778 \uAC83 \uAC19\uC544\uC694.", cn: "\u597D\u50CF\u662F\u547D\u8FD0\u5462\u3002" }
    ],
    vocab: [
      { korean: "\uC545\uB9C8", romanization: "angma", chinese: "\u6076\u9B54", level: 3 },
      { korean: "\uACC4\uC57D", romanization: "gyeyak", chinese: "\u5951\u7EA6", level: 3 },
      { korean: "\uC6B4\uBA85", romanization: "unmyeong", chinese: "\u547D\u8FD0", level: 3 },
      { korean: "\uAE30\uC5C5", romanization: "gieop", chinese: "\u4F01\u4E1A", level: 3 }
    ],
    grammar: [
      { pattern: "\uACC4\uC57D\uD574\uC694\uFF08\u7B7E\u5951\u7EA6\xB7\u656C\u8BED\uFF09", explanation: "\uACC4\uC57D(\u5951\u7EA6) + \uD558\uB2E4 \u2192 \uACC4\uC57D\uD574\uC694\uFF1B\u5267\u60C5\u7528\u656C\u8BED\u663E\u6B63\u5F0F\u611F\u3002", example: "\uACC4\uC57D\uD574\uC694." },
      { pattern: "~\uC778 \uAC83 \uAC19\uC544\uC694\uFF08\u597D\u50CF~\uFF09", explanation: '\uAC83 \uAC19\uB2E4 \u8868\u63A8\u6D4B"\u597D\u50CF"\uFF1B\uC778 \u6765\u81EA \uC774\uB2E4\u3002', example: "\uC6B4\uBA85\uC778 \uAC83 \uAC19\uC544\uC694." }
    ],
    culture: '\u300A\u4E0E\u6076\u9B54\u6709\u7EA6\u300B(\uC545\uB9C8\uC640 \uAC70\uB798\uD588\uB2E4) \u662F 2023-2024 \u5E74 SBS \u5947\u5E7B\u6D6A\u6F2B\u5267\uFF0C\u7537\u4E3B\u4E3A"\u6076\u9B54"\u8BBE\u5B9A\uFF0C\u53F0\u8BCD\u591A\u7528\u6B63\u5F0F\u656C\u8BED\u8425\u9020\u8DDD\u79BB\u611F\u3002',
    searchQuery: "\u4E0E\u6076\u9B54\u6709\u7EA6 \u540D\u573A\u9762 \u53F0\u8BCD"
  },
  {
    id: "drama-watch",
    title: "\u901A\u7528 \xB7 \u8FFD\u5267\u5FC5\u5907\u53E5",
    group: "\u97E9\u5267\u901A\u7528",
    kind: "drama",
    desc: "\u770B\u4EFB\u4F55\u97E9\u5267\u90FD\u80FD\u7528\u4E0A\u7684\u9AD8\u9891\u611F\u53F9\u4E0E\u8BA8\u8BBA\u53E5\u3002",
    dialogue: [
      { kr: "\uB4DC\uB77C\uB9C8 \uC9C4\uC9DC \uC7AC\uBBF8\uC788\uC5B4\uC694.", cn: "\u8FD9\u90E8\u5267\u771F\u7684\u597D\u770B\u3002" },
      { kr: "\uB2E4\uC74C \uD68C \uAE30\uB2E4\uB824\uC694.", cn: "\u7B49\u7740\u770B\u4E0B\u4E00\u96C6\u3002" }
    ],
    vocab: [
      { korean: "\uB4DC\uB77C\uB9C8", romanization: "deurama", chinese: "\u7535\u89C6\u5267", level: 1 },
      { korean: "\uC7AC\uBBF8\uC788\uB2E4", romanization: "jaemi-itda", chinese: "\u6709\u8DA3", level: 1 },
      { korean: "\uAE30\uB2E4\uB9AC\uB2E4", romanization: "gidarida", chinese: "\u7B49\u5F85", level: 1 },
      { korean: "\uD68C", romanization: "hoe", chinese: "\u96C6\uFF08\u91CF\u8BCD\uFF09", level: 2 }
    ],
    grammar: [
      { pattern: "\uC7AC\uBBF8\uC788\uC5B4\uC694\uFF08\u597D\u770B\xB7\u656C\u8BED\uFF09", explanation: "\uC7AC\uBBF8\uC788\uB2E4 \u2192 \uC7AC\uBBF8\uC788\uC5B4\uC694\uFF08\u3142\u4E0D\u89C4\u5219\uFF09\u3002", example: "\uC7AC\uBBF8\uC788\uC5B4\uC694." },
      { pattern: "\uAE30\uB2E4\uB824\uC694\uFF08\u7B49\u5F85\xB7\u656C\u8BED\uFF09", explanation: "\uAE30\uB2E4\uB9AC\uB2E4 \u656C\u8BED\uFF1B\u5E73\u8BED \uAE30\uB2E4\uB824\u3002", example: "\uAE30\uB2E4\uB824\uC694." }
    ],
    culture: '\u97E9\u56FD\u4EBA\u8FFD\u5267\u5E38\u7528"\uBAB0\uC785(\u6C89\u6D78)""\uD0B9\uBC1B\uB2E4(\u6C14\u6B7B)"\u7B49\u7F51\u7EDC\u70ED\u8BCD\uFF1B"\uB2E4\uC74C \uD68C"\u6307\u4E0B\u4E00\u96C6\uFF0C\u8FFD\u66F4\u6587\u5316\u76DB\u884C\u3002',
    searchQuery: "\u97E9\u5267 \u7ECF\u5178\u53F0\u8BCD \u5408\u96C6"
  }
];

// src/utils/koreanPhonetics.ts
var ONSET = ["\u3131", "\u3132", "\u3134", "\u3137", "\u3138", "\u3139", "\u3141", "\u3142", "\u3143", "\u3145", "\u3146", "\u3147", "\u3148", "\u3149", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
var NUC = ["\u314F", "\u3150", "\u3151", "\u3152", "\u3153", "\u3154", "\u3155", "\u3156", "\u3157", "\u3158", "\u3159", "\u315A", "\u315B", "\u315C", "\u315D", "\u315E", "\u315F", "\u3160", "\u3161", "\u3162", "\u3163"];
var CODA = ["", "\u3131", "\u3132", "\u3133", "\u3134", "\u3135", "\u3136", "\u3137", "\u3139", "\u313A", "\u313B", "\u313C", "\u313D", "\u313E", "\u313F", "\u3140", "\u3141", "\u3142", "\u3144", "\u3145", "\u3146", "\u3147", "\u3148", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
var oi = (c) => ONSET.indexOf(c);
var ci = (c) => CODA.indexOf(c);
function isHangulSyllable(ch) {
  const c = ch.codePointAt(0) || 0;
  return c >= 44032 && c <= 55203;
}
function decompose(ch) {
  const c = ch.codePointAt(0) || 0;
  if (c < 44032 || c > 55203) return null;
  const base = c - 44032;
  return {
    onset: Math.floor(base / 588),
    nucleus: Math.floor(base % 588 / 28),
    coda: base % 28
  };
}
function compose(s) {
  const code = 44032 + (s.onset * 21 + s.nucleus) * 28 + s.coda;
  return String.fromCodePoint(code);
}
var isEmptyOnset = (o) => o === 0 || o === 11;
var aspirate = (c) => ({ "\u3131": "\u314B", "\u3137": "\u314C", "\u3142": "\u314D", "\u3148": "\u314A" })[c] || c;
var fortis = (c) => ({ "\u3131": "\u3132", "\u3137": "\u3138", "\u3142": "\u3143", "\u3145": "\u3146", "\u3148": "\u3149" })[c] || c;
var nasalize = (c) => ({ "\u3131": "\u3147", "\u3137": "\u3134", "\u3142": "\u3141" })[c] || c;
var LINK_SPLIT = {
  "\u313A": ["\u3139", "\u3131"],
  "\u313B": ["\u3139", "\u3141"],
  "\u313C": ["\u3139", "\u3142"],
  "\u313D": ["\u3139", "\u3145"],
  "\u313E": ["\u3139", "\u314C"],
  "\u313F": ["\u3139", "\u314D"],
  "\u3140": ["\u3139", ""],
  "\u3136": ["\u3134", ""],
  "\u3135": ["\u3134", "\u3148"],
  "\u3133": ["\u3131", "\u3145"],
  "\u3144": ["\u3142", "\u3145"]
};
function transformRun(sylls) {
  const S = sylls.map((x) => ({ ...x }));
  const n = S.length;
  for (let i = 0; i < n - 1; i++) {
    let C2 = CODA[S[i].coda];
    const O = S[i + 1].onset;
    const N = S[i + 1].nucleus;
    if (!C2) continue;
    const setCoda = (ch) => S[i].coda = ci(ch);
    const setNextOnset = (ch) => S[i + 1].onset = oi(ch);
    if (["\u3131", "\u3137", "\u3142"].includes(C2) && ["\u3134", "\u3141"].includes(ONSET[O])) {
      setCoda(nasalize(C2));
    } else if (["\u3141", "\u3147"].includes(C2) && ONSET[O] === "\u3139" || C2 === "\u3139" && ["\u3134", "\u3141"].includes(ONSET[O])) {
      setNextOnset("\u3134");
    } else if (C2 === "\u314E") {
      if (["\u3134", "\u3141", "\u3139"].includes(ONSET[O])) setCoda("");
      else if (["\u3131", "\u3137", "\u3148"].includes(ONSET[O])) {
        setNextOnset(aspirate(ONSET[O]));
        setCoda("");
      }
    } else if (["\u3131", "\u3137", "\u3142", "\u3148"].includes(C2) && ONSET[O] === "\u314E") {
      setNextOnset(aspirate(C2));
      setCoda("");
    } else if (C2 === "\u3137" && ["\u3163", "\u3151", "\u3155", "\u315B", "\u3160"].includes(NUC[N])) {
      setCoda("\u3148");
    } else if (["\u3131", "\u3137", "\u3142", "\u3134", "\u3141", "\u3139"].includes(C2) && ["\u3131", "\u3137", "\u3142", "\u3145", "\u3148"].includes(ONSET[O])) {
      setNextOnset(fortis(ONSET[O]));
    }
    C2 = CODA[S[i].coda];
    if (C2 && isEmptyOnset(S[i + 1].onset)) {
      const split = LINK_SPLIT[C2];
      if (split) {
        setCoda(split[0]);
        if (split[1]) setNextOnset(split[1]);
      } else {
        setNextOnset(C2);
        setCoda("");
      }
    }
  }
  return S;
}
function applyPhonetics(text) {
  const chars = [...text];
  const idx = [];
  const sylls = chars.map((ch, i) => {
    if (isHangulSyllable(ch)) {
      idx.push(i);
      return decompose(ch);
    }
    return null;
  });
  const seq = sylls.filter((s) => s !== null);
  if (seq.length <= 1) return text;
  const transformed = transformRun(seq);
  const out2 = [...chars];
  transformed.forEach((s, k) => {
    out2[idx[k]] = compose(s);
  });
  return out2.join("");
}
function applyPhoneticsIfNeeded(text, opts) {
  if (!opts?.force && !/\s/.test(text)) return text;
  return applyPhonetics(text);
}

// collect.ts
var out = /* @__PURE__ */ new Set();
var INITIAL_CODE = { "\u3131": 4352, "\u3132": 4353, "\u3134": 4354, "\u3137": 4355, "\u3138": 4356, "\u3139": 4357, "\u3141": 4358, "\u3142": 4359, "\u3143": 4360, "\u3145": 4361, "\u3146": 4362, "\u3147": 4363, "\u3148": 4364, "\u3149": 4365, "\u314A": 4366, "\u314B": 4367, "\u314C": 4368, "\u314D": 4369, "\u314E": 4370 };
var MEDIAL_CODE = { "\u314F": 4449, "\u3150": 4450, "\u3151": 4451, "\u3152": 4452, "\u3153": 4453, "\u3154": 4454, "\u3155": 4455, "\u3156": 4456, "\u3157": 4457, "\u3158": 4458, "\u3159": 4459, "\u315A": 4460, "\u315B": 4461, "\u315C": 4462, "\u315D": 4463, "\u315E": 4464, "\u315F": 4465, "\u3160": 4466, "\u3161": 4467, "\u3162": 4468, "\u3163": 4469 };
var FINAL_CODE = { "\u3131": 4520, "\u3132": 4521, "\u3133": 4522, "\u3134": 4523, "\u3135": 4524, "\u3136": 4525, "\u3137": 4526, "\u3139": 4527, "\u313A": 4528, "\u313B": 4529, "\u313C": 4530, "\u313D": 4531, "\u313E": 4532, "\u313F": 4533, "\u3140": 4534, "\u3141": 4535, "\u3142": 4536, "\u3144": 4537, "\u3145": 4538, "\u3146": 4539, "\u3147": 4540, "\u3148": 4541, "\u314A": 4542, "\u314B": 4543, "\u314C": 4544, "\u314D": 4545, "\u314E": 4546 };
function composeSyllable(initial, medial, final = "") {
  const i = INITIAL_CODE[initial];
  const v = MEDIAL_CODE[medial];
  if (i === void 0 || v === void 0) return initial + medial + final;
  let f = 0;
  if (final) {
    const fc = FINAL_CODE[final];
    if (fc === void 0) return initial + medial + final;
    f = fc - 4520 + 1;
  }
  return String.fromCodePoint(44032 + (i - 4352) * 588 + (v - 4449) * 28 + f);
}
var add = (s) => {
  if (typeof s !== "string") return;
  const t = s.trim().normalize("NFC");
  if (!t) return;
  if (!/[가-힣]/.test(t)) return;
  if (/[a-zA-Z→★·]/.test(t)) return;
  out.add(applyPhoneticsIfNeeded(t));
};
ALPHABET.forEach((s) => {
  if (s.example && s.example.word) add(s.example.word);
  add(s.char);
  if (s.name) add(s.name);
  if (s.category === "consonant") add(composeSyllable(s.char, "\u314F"));
  if (s.category === "batchim") add(composeSyllable("\u3147", "\u314F", s.char));
});
PRONUNCIATION.forEach((r) => r.examples.forEach((e) => add(e.ko)));
VOCAB.forEach((topic) => topic.words.forEach((w) => add(w.korean)));
DIALOGUES.forEach((d) => {
  d.lines.forEach((l) => add(l.ko));
  ;
  d.vocabulary.forEach((v) => add(v.word));
});
GRAMMAR.forEach((g) => g.examples.forEach((e) => add(e.ko)));
bookVocab.forEach((b) => b.words.forEach((w) => {
  if (w.korean) add(w.korean);
  if (w.example) add(w.example);
}));
DAILY_LESSONS.forEach((d) => {
  d.words.forEach((w) => add(w.korean));
  d.sentences.forEach((s) => add(s.korean));
  d.grammar.forEach((g) => add(g.example));
});
[...ANIMATIONS, ...KPOP, ...DRAMAS].forEach((it) => {
  ;
  (it.dialogue || []).forEach((d) => add(d.kr));
  (it.vocab || []).forEach((v) => add(v.korean));
  (it.grammar || []).forEach((g) => add(g.example));
});
var STRINGS = [...out];
export {
  STRINGS
};
