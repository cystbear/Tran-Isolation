function formatCode (s) {
//	s = s.replace(/^\s+/, '');
//	s = s.replace(/\s+$/, '');
//	s = s.replace(/[\r\n]*(<[^>]+>)[\r\n]*/gi, '$1');
//	s = s.replace(/(?=<pre[^>]*>(?!<\/pre>).*)\r?\n/gi, '<br/>');
	s = s.replace(/\r?\n/g, ' _rn_ ');
//	s = s.replace(/\t/g, '&nbsp; &nbsp; &nbsp; ');
//	s = s.replace(/\s/g, ' ');
//	s = s.replace(/  /g, '&nbsp; ');
//	s = s.replace(/&amp;nbsp;/g, '&nbsp;');
//	s = s.replace(/(\S)&nbsp;(\S)/g, '$1 $2');
//	s = s.replace(/<p>\s+<\/p>/gi, '<p>&nbsp;</p>');

	try {
		var re = new RegExp("<pre([^>]*)>(.*?)</pre>", "gim");
		s = s.replace(re, formatCode1C);
	} catch(e) {}
	s = s.replace(/ _rn_ /g, '\r\n');
	return s;
}
function formatCode1C(a, b, c) {
//	alert(a)
	if (b != '') {
		return a;
	}

//	c = c.replace(/^\s+/, '');
//	c = c.replace(/\s+$/, '');
//	c = c.replace(/[\r\n]*(<[^>]+>)[\r\n]*/gi, '$1');
	c = c.replace(/ _rn_ /g, '<br/>');
//	c = c.replace(/\t/g, '&nbsp; &nbsp; &nbsp; ');
//	c = c.replace(/\s/g, ' ');
//	c = c.replace(/  /g, '&nbsp; ');
//	c = c.replace(/&amp;nbsp;/g, '&nbsp;');
//	c = c.replace(/(\S)&nbsp;(\S)/g, '$1 $2');

	c = c.replace(/<\/?span[^>]*>/gi, '');
	c = c.replace(/([;\=\.\(\),\-\+\*\[\]\?])/gi, '<span class=sign>$1</span>');
	c = c.replace(/(&[^\s;]+)<span class=sign>;<\/span>/gi, '$1;');
	c = c.replace(/(&[^\s;]+;)/gi, '<span class=sign>$1</span>');
	c = c.replace(/(\d+)/gi, '<span class=digit>$1</span>');
	var re = new RegExp('(".*?")', "g");
	c = c.replace(re, formatString);
	c = c.replace(/(\s|>|^|;)(if|если|then|тогда|elsif|иначеесли|else|иначе|endif|конецесли|do|цикл|for|для|to|по|each|каждого|in|из|while|пока|endDo|конеццикла|procedure|процедура|endprocedure|конецпроцедуры|function|функция|endfunction|конецфункции|var|перем|export|экспорт|goto|перейти|and|и|or|или|not|не|val|знач|break|прервать|continue|продолжить|return|возврат|try|попытка|except|исключение|endTry|конецпопытки|raise|вызватьисключение|false|ложь|true|истина|undefined|неопределено|null|new|новый|execute|выполнить)(\s|<|$|&)/gi, '$1<span class="word">$2</span>$3');
	re = new RegExp("(//.*?)<br\\s*/?>", "gi");
	c = c.replace(re, formatComment);
	re = new RegExp("(/\\*.*?\\*/)<br\\s*/?>", "gi");
	c = c.replace(re, formatComment);
//	c = c.replace(/<br\s*\/>/gi, '\n');
//	if (isMS)
		c = '<div class="sampcont"><samp' + b + '>' + c + '</samp></div>';
//	else
//		c = '<pre' + b + '>' + c + '</pre>';
	return c;
}
function formatComment(a, b) {
	var re = new RegExp("<span class=[^>]+>(.*?)</span>", "gi");
	b = b.replace(re, '$1');
	return '<span class="comment">' + b + '</span><br/>';
}
function formatString(a, b) {
	var re = new RegExp("<span class=[^>]+>(.*?)</span>", "gi");
	b = b.replace(re, '$1');
	return '<span class="string">' + b + '</span>';
}
function formatMess() {
	var dom = (document.getElementById)? true : false;
	if (!dom) return;
	var div = document.getElementById('copytextbody');
	if (div) {
		div.innerHTML = formatCode(div.innerHTML);
	}
}