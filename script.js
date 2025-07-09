/* ---------- STATE ---------- */
let expression = "";
const display = document.getElementById("display");
const keys     = document.querySelector(".keys");
const calcBox  = document.querySelector(".calc");

/* ---------- HELPERS ---------- */
const factorial = n => (n<=1)?1:n*factorial(n-1);
const updateDisplay = () => display.textContent = expression || "0";
const append = val => {expression += val; updateDisplay();};

/* ---------- KEYBOARD SUPPORT ---------- */
document.addEventListener("keydown",e=>{
  if("0123456789.+-*/%".includes(e.key)) append(e.key);
  if(e.key==="Enter"||e.key==="=") evaluate();
  if(e.key==="Backspace") del();
  if(e.key==="Escape") clearAll();
});

/* ---------- ACTIONS ---------- */
function clearAll(){expression="";updateDisplay();}
function del(){expression=expression.slice(0,-1);updateDisplay();}
function evaluate(){
  if(!expression) return;
  try{
    /* eslint no-eval:0 */
    const result = Function(`return (${expression})`)();
    expression = String(result);
  }catch{
    expression="Error";
  }
  updateDisplay();
}

/* ---------- ADVANCED OPS ---------- */
function adv(op){
  let val;
  switch(op){
    case "sin": val=`Math.sin(${expression}*Math.PI/180)`;break;
    case "cos": val=`Math.cos(${expression}*Math.PI/180)`;break;
    case "tan": val=`Math.tan(${expression}*Math.PI/180)`;break;
    case "log": val=`Math.log10(${expression})`;break;
    case "√"  : val=`Math.sqrt(${expression})`;break;
    case "^"  : expression += "**"; updateDisplay();return;
    case "!"  : val=factorial(Number(expression));break;
  }
  if(val!==undefined){expression = String(Function(`return ${val}`)()); updateDisplay();}
}

/* ---------- CLICK HANDLER ---------- */
keys.addEventListener("click", e=>{
  const t=e.target;
  if(!t.matches("button")) return;

  if(t.dataset.num)      return append(t.dataset.num);
  if(t.dataset.op)       return append(t.dataset.op);
  if(t.dataset.fn==="clear")  return clearAll();
  if(t.dataset.fn==="delete") return del();
  if(t.dataset.fn==="equals") return evaluate();
  if(t.dataset.fn==="toggle") return calcBox.classList.toggle("adv-show");
  if(t.dataset.adv)      return adv(t.dataset.adv);
});

/* ---------- INIT ---------- */
updateDisplay(); 
  if (display.value === "0786") {
    // Redirect to another website
    window.location.href = "https://mdmahfuz786.github.io/TG-Bookmark-/";  // <- Change this to your desired URL
  } else {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  }
  }
