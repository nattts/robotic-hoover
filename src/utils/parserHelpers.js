const removeNewLines = data => data.split(/\r\n|\r|\n/);

const integerConverter = data => data.map((x) => x.split(' '))
 .map((x) => x.map((y)=> parseInt(y) ));


module.exports = { removeNewLines, integerConverter };

