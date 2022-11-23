const templates = [
  `
  operator <>= left 1 = (left, right) => {
    return #\`\${left} < \${right} || \${left} > \${right} || \${left} === \${right}\`;
  };
  `,
  `
  operator === left 1 = (left, right) => {
    if (isNaN(left.value) && isNaN(right.value)) {
      return #\`true\`;
    } else {
      return #\`\${left} === \${right}\`;
    }
  };
  `,
  `
  operator % left 1 = (left, right) => {
    return #\`Math.floor(shitty.div(\${right}, 100) * (\${left}))\`;
  };
  `,
  `
  operator - left 1 = (left, right) => {
    if (typeof left.value === "string" && typeof right.value === "string") {
       const letters = [];
      
       for(let i = 0; i < left.value.length; i++) {
         if (right.value.includes(left.value[i]) === false) {
           letters.push(left.value[i])
         }
       }
   
       const result = {
         value: letters.join('')
       }
   
       Object.setPrototypeOf(result, left);
   
       return #\`\${result}\`;
     } else {
       return #\`\${left} - \${right}\`;
     }
   }
  `,
  `
  operator + left 1 = (left, right) => {
    if (typeof left.value === "number" && typeof right.value === "number") {
      return #\`Number(String(\${left}) + String(\${right}))\`;
    } else {
      return #\`\${left} + \${right}\`;
    }
  };
  `,
  `
  operator * left 1 = (left, right) => {
    if (typeof left.value === "string" && typeof right.value === "number") {
      return #\`\${left}.repeat(\${right})\`;
    } else {
      return #\`\${left} * \${right}\`;
    }
  };
  `,
  `
  operator / left 1 = (left, right) => {
    if (typeof left.value === "string" && typeof right.value === "number") {
      return #\`\${left}.slice(0, shitty.div(\${left}.length, \${right}))\`;
    } else {
      return #\`shitty.div(\${left},\${right})\`;
    }
  };
  `
];

const shitty = {
  div(left, right) {
    return left / right;
  }
}

window.addEventListener('load', () => {
  const code = document.querySelector('script[type="shitty-javascript"]');

  if (code) {
    const result = sweet.compile(templates.join('') + code.innerText);

    eval(result.code);
  }
});

