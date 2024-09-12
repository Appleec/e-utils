/**
 *  Create by appleex on 2022/4/11 4:05 下午.
 */

/**
 * keyCodes
 *
 * @summary keyCodes
 * @since 0.2.0
 * @category Util
 * @description
 *
 * // 字母和数字键的键码值(KeyCode)
 * 按键	键码	按键	键码
 * A	65	J	74
 * B	66	K	75
 * C	67	L	76
 * D	68	M	77
 * E	69	N	78
 * F	70	O	79
 * G	71	P	80
 * H	72	Q	81
 * I	73	R	82
 *
 * 按键	键码	按键	键码
 * S	83	1	49
 * T	84	2	50
 * U	85	3	51
 * V	86	4	52
 * W	87	5	53
 * X	88	6	54
 * Y	89	7	55
 * Z	90	8	56
 * 0	48	9	57
 *
 * // 数字键盘上的键的键码值(KeyCode)
 * 按键	键码	按键	键码
 * 0	96	8	104
 * 1	97	9	105
 * 2	98	*	106
 * 3	99	+	107
 * 4	100	Enter	108
 * 5	101	-	109
 * 6	102	.	110
 * 7	103	/	111
 *
 * // 功能键键码值(KeyCode)
 * 按键	键码	按键	键码
 * F1	112	F7	118
 * F2	113	F8	119
 * F3	114	F9	120
 * F4	115	F10	121
 * F5	116	F11	122
 * F6	117	F12	123
 *
 * //控制键键码值(KeyCode)
 * 按键	       键码	     按键	        键码
 * BackSpace   8	     Esc	        27
 * Tab	       9	     Spacebar	    32
 * Clear	   12	     Page Up	    33
 * Enter	   13	     Page Down	    34
 * Shift	   16	     End	        35
 * Control	   17	     Home	        36
 * Alt	       18	     Left Arrow	    37
 * Cape Lock   20	     Up Arrow	    38
 *
 * // 控制键键码值(KeyCode)
 * 按键	            键码	      按键	         键码
 * Right Arrow	    39	      -_	         189
 * Dw Arrow	        40	      .>	         190
 * Insert	        45	      /?	         191
 * Delete	        46	      `~	         192
 * Num Lock	        144	      [{	         219
 * ;:	            186	      \|	         220
 * =+	            187	      ]}	         221
 * ,<	            188	      '"	         222
 *
 * // 多媒体键码值(KeyCode)
 * 按键	      键码	按键	键码
 * 音量加	  175
 * 音量减	  174
 * 停止	      179
 * 静音	      173
 * 浏览器	  172
 * 邮件	      180
 * 搜索	      170
 * 收藏        171
 */
const keyCodes = Object.freeze({
     enter: 13,
     tab: 9,
     delete: 46,
     esc: 27,
     space: 32,
     up: 38,
     down: 40,
     left: 37,
     right: 39,
     end: 35,
     home: 36,
     del: 46,
     backspace: 8,
     insert: 45,
     pageup: 33,
     pagedown: 34
 });

export default keyCodes;
