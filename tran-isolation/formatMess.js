function formatCode (s) {
    s = s.replace(/\r?\n/g, ' _rn_ ');

    try {
        var re = new RegExp("<pre([^>]*)>(.*?)</pre>", "gim");
        s = s.replace(re, formatCode1C);
    } catch(e) {}
    s = s.replace(/ _rn_ /g, '\r\n');
    return s;
}
function formatCode1C(a, b, c) {
    if (b != '') {
        return a;
    }
    c = c.replace(/ _rn_ /g, '<br/>');

    c = c.replace(/<\/?span[^>]*>/gi, '');
    c = c.replace(/([;\=\.\(\),\-\+\*\[\]\?])/gi, '<span class=sign>$1</span>');
    c = c.replace(/(&[^\s;]+)<span class=sign>;<\/span>/gi, '$1;');
    c = c.replace(/(&[^\s;]+;)/gi, '<span class=sign>$1</span>');
    c = c.replace(/(\d+)/gi, '<span class=digit>$1</span>');
    var re = new RegExp('(".*?")', "g");
    c = c.replace(re, formatString);
    c = c.replace(/(\s|>|^|;)(if|����|then|�����|elsif|���������|else|�����|endif|���������|do|����|for|���|to|��|each|�������|in|��|while|����|endDo|����������|procedure|���������|endprocedure|��������������|function|�������|endfunction|������������|var|�����|export|�������|goto|�������|and|�|or|���|not|��|val|����|break|��������|continue|����������|return|�������|try|�������|except|����������|endTry|������������|raise|�����������������|false|����|true|������|undefined|������������|null|new|�����|execute|���������)(\s|<|$|&)/gi, '$1<span class="word">$2</span>$3');
    re = new RegExp("(//.*?)<br\\s*/?>", "gi");
    c = c.replace(re, formatComment);
    re = new RegExp("(/\\*.*?\\*/)<br\\s*/?>", "gi");
    c = c.replace(re, formatComment);
        c = '<div class="sampcont"><samp' + b + '>' + c + '</samp></div>';
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
