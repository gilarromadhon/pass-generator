import './App.css';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import IconCopy from './asset/file-copy-line.png';
import IconRefresh from './asset/refresh-line.png';

function randomString(len, charSet) {
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

function App() {
  const [value, setValue] = React.useState(null)
  const [copied, setCopied] = React.useState(false);
  const [level, setLevel] = React.useState("Medium");
  const [length, setLength] = React.useState(30)
  const [state, setState] = React.useState({
    check1: true,
    check2: true,
    check3: true,
    check4: true,
  })

  const handleChange = (event) => {
    setLength(event.target.value );
  };

  const handleGenerate = (event) => {
    var arr = []
    if (state.check1) {
      arr.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    }

    if (state.check2) {
      arr.push("abcdefghijklmnopqrstuvwxyz")
    }

    if (state.check3) {
      arr.push("1234567890")
    }

    if (state.check4) {
      arr.push("!@#$%^&*()_+-={}[];':,./<>?|")
    }

    var newArr = arr.toString().replaceAll(',', '');

    if (length > 30) {
      arr = randomString(30, newArr);
    } else {
      arr = randomString(length, newArr);
    }

    if (length >= 15) {
      setLevel("Strong")
    } else if (length >= 10) {
      setLevel("Medium")
    } else {
      setLevel("Weak")
    }

    setValue(arr);
  };

  const handleCheck = (event) => {
    if ((!state.check1 && !state.check2 && !state.check3 && state.check4) ||
        (!state.check1 && !state.check2 && state.check3 && !state.check4) || 
        (!state.check1 && state.check2 && !state.check3 && !state.check4) ||
        (state.check1 && !state.check2 && !state.check3 && !state.check4)) {
      setState({ ...state, [event.target.name]: true });
    } else {
      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };
  const onClick = React.useCallback(({target: {innerText}}) => {
    console.log(`Clicked on "${innerText}"!`);
  }, [])
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, [])

  if (copied) {
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-auto md:h-screen text-white w-screen py-20">
        <h1 className="text-xl md:text-3xl font-mono">
          Password Generator Tool
        </h1>
        <h1 className="text-4xl md:text-5xl text-center font-extrabold m-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-lime-500">
          Generate a secure password
        </h1>
        <p className='text-sm text-center px-10'>
          Use our online password generator to instantly create a secure, random password.
        </p>

        <div className="flex m-10 relative">
          <div className="bg-slate-500 p-5 rounded-l-md md:text-lg text-xs sm:w-96 w-64">
            {value === null ? "please generate new password" : value}
          </div>
          <div className="flex items-center justify-center bg-slate-500 p-5 w-24 rounded-r-md sm:rounded-none">
            <h1 className={`font-semibold md:text-lg text-xs  ${level === "Strong" ? 'text-lime-400' : level === "Medium" ? 'text-yellow-400' : 'text-red-500'}`}>
              {value === null ? "" : level}
            </h1>
          </div>
          <div className="hidden sm:inline-block bg-slate-700 p-5 font-mono cursor-pointer">
            <CopyToClipboard
              onCopy={onCopy}
              options={{message: 'Whoa!'}}
              text={value}>
              <span onClick={onClick}>
                <div className="tooltip hover:tooltip-open" data-tip="Copy">
                  <img src={IconCopy} alt="icon" className='mt-1 w-5'/>
                </div>
              </span>
            </CopyToClipboard>
          </div>
          <div className="hidden sm:inline-block bg-slate-900 p-5 rounded-r-md cursor-pointer" onClick={handleGenerate}>
            <div className="tooltip hover:tooltip-open" data-tip="Generate">
              <img src={IconRefresh} alt="icon" className='mt-1 w-5'/>
            </div>
          </div>
          {/* <progress 
            className={`progress w-full absolute bottom-0 ${level === "Medium" ? "progress-warning" : level === "Weak" ? "progress-error" : "progress-success"}`}
            value={level === "Strong" ? "100" : level === "Medium" ? "60" : "20"} 
            max="100"
          >
          </progress> */}
        </div>


        {/* mobile screen */}
        <div className='flex sm:hidden mb-10 w-80 items-center justify-around'>
          <button className="btn w-32 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <CopyToClipboard
              onCopy={onCopy}
              options={{message: 'Whoa!'}}
              text={value}>
              <span onClick={onClick}>
                <div className="flex items-center justify-center text-white ">
                  <img src={IconCopy} alt="icon" className='w-4 mr-3'/> 
                  Copy
                </div>
              </span>
            </CopyToClipboard>
          </button>
          <button className="btn w-40 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-cyan-500 to-blue-500" onClick={handleGenerate}>
            <img src={IconRefresh} alt="icon" className='w-5 mr-3'/>
            Generate
          </button>
        </div>

        <div className="flex md:w-6/12 w-5/6 rounded-md p-5 bg-slate-50 flex-col">
            <h1 className="text-2xl font-bold m-5 text-slate-800 text-center">
              Password Settings
            </h1>
            <div className="flex">
              <div className="flex-1 bg-slate-500 p-5 sm:p-10 rounded-l-md items-center justify-center">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-white">Length Password</span>
                    {/* <span className="label-text-alt">Alt label</span> */}
                  </label>
                  <input type="number" min="6" max="30" maxLength={2} value={length} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                  <label className="label">
                    <span className="label-text-alt text-white">Min 6</span>
                    <span className="label-text-alt text-white">Max 30</span>
                  </label>
                </div>
              </div>
              <div className="flex-1 bg-slate-700 p-5 md:px-10 xs:px-5 rounded-r-md items-center justify-center">
                <div className="flex align-middle justify-center text-left mb-5">
                  <h1 className={`font-sans text-base flex-1 ${state.check1 ? '' : 'line-through'}`}>Uppercase</h1>
                  <input type="checkbox" className="toggle toggle-success ml-5"  name="check1" checked={state.check1} onChange={handleCheck} />
                </div>
                <div className="flex align-middle justify-center text-left mb-5">
                  <h1 className={`font-sans text-base flex-1 ${state.check2 ? '' : 'line-through'}`}>Lowercase</h1>
                  <input type="checkbox" className="toggle toggle-success ml-5"  name="check2" checked={state.check2} onChange={handleCheck} />
                </div>
                <div className="flex align-middle justify-center text-left mb-5">
                  <h1 className={`font-sans text-base flex-1 ${state.check3 ? '' : 'line-through'}`}>Number</h1>
                  <input type="checkbox" className="toggle toggle-success ml-5"  name="check3" checked={state.check3} onChange={handleCheck} />
                </div>
                <div className="flex align-middle justify-center text-left">
                  <h1 className={`font-sans text-base flex-1 ${state.check4 ? '' : 'line-through'}`}>Symbol</h1>
                  <input type="checkbox" className="toggle toggle-success ml-5"  name="check4" checked={state.check4} onChange={handleCheck} />
                </div>
              </div>
            </div>
        </div>

        <h1 className='underline inline-block sm:hidden absolute bottom-5 text-xs cursor-pointer' onClick={() => {window.open("https://github.com/gilarromadhon", "_blank");}}>
          Gilar Romadhon
        </h1>
        
        <div className="tooltip hover:tooltip-open absolute left-5 bottom-5 hidden sm:inline-block" data-tip="Developer">
          <div className="avatar online placeholder cursor-pointer" onClick={() => {window.open("https://github.com/gilarromadhon", "_blank");}}>
            <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
              <span className="text-xl">GR</span>
            </div>
          </div> 
        </div>

        <div className={`toast toast-end toast-top ${copied ? '' : 'hidden'}`}>
          <div className="alert alert-info bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-white font-bold">
            <div>
              <span>Copied!</span>
            </div>
          </div>
        </div>
        {/* <button className="btn w-64 rounded-full">Button</button> */}
    </div>
  );
}

export default App;
