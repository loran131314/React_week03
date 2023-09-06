import axios from "axios";
import { useState } from "react"

function Todo() {


  /* ---------- 物件的欄位必須跟API文件一樣 ---------- */

  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  const [token, setToken] = useState('');

  // const handleCheck = (e) => {
  //   console.log(e.target.name);
  //   const { name, value } = e.target;
  //   if (e.target.checked) {
  //     setForm({
  //       ...form,
  //       [name]: [...form[name], value],
  //     })
  //   } else {
  //     setForm({
  //       ...form,
  //       [name]: form[name].filter((item) => item !== value),
  //     })
  //   }
  // }

  function handleInput(e) {
    // console.log(e.target.name);   // 確認目標欄位
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  const apiUrl = 'https://todolist-api.hexschool.io';    // API = 伺服器 + 路由
  const signUp = () => {
    console.log('signUp form:', form);
    (async () => {
      const res = await axios.post(`${apiUrl}/users/sign_up`, form)
      console.log(res);
    })()
  }
  const signIn = () => {
    console.log('signIn form:', form);
    (async () => {
      const res = await axios.post(`${apiUrl}/users/sign_in`, form)
      console.log(res);
      console.log(res.data.token);
    })()
  }
  const checkOut = () => {
    console.log('checkOut token:', token);
    (async () => {
      const res = await axios.get(`${apiUrl}/users/checkout`, {
        headers: {
          Authorization: token,
        }
      })
      console.log(res);
    })()
  }
  const signOut = () => {  /* ---------- 修正 ---------- */
    console.log('signOut token:', token);
    (async () => {
      try {
        const res = await axios.post(`${apiUrl}/users/sign_out`, token, {
          headers: {
            Authorization: token,
          }
        })
        console.log(res.data);
      } catch (error) {
        console.log('err', error)
      }
    })()
  }

  return (
    <>
      <a href="https://todolist-api.hexschool.io/doc/#/">六角學院 - TodoList API</a>
      <div className="my-auto d-flex">
        <div className="m-3 p-3 border">
          <h2>註冊</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="email">Email</label><br />
              <input type="email" id="email" name="email" placeholder="Email" onChange={handleInput} />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label><br />
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleInput} />
            </div>
            <div className="mb-3">
              <label htmlFor="nickname">Nickname</label><br />
              <input type="text" id="nickname" name="nickname" placeholder="Nickname" onChange={handleInput} />
            </div>
            <button type="button" onClick={signUp}>Sign Up</button>
          </div>
        </div>
        <div className="m-3 p-3 border">
          <h2>登入</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="email">Email</label><br />
              <input type="email" id="email" name="email" placeholder="Email" onChange={handleInput} />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label><br />
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleInput} />
            </div>
            <button type="button" onClick={signIn}>Sign In</button>
          </div>
        </div>
        <div className="m-3 p-3 border">
          <h2>驗證</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="token">Token</label><br />
              <input type="text" id="token" name="token" placeholder="Token" onChange={(e) => {
                setToken(e.target.value);
              }} />
            </div>
            <button type="button" onClick={checkOut}>Check Out</button>
          </div>
        </div>
        <div className="m-3 p-3 border">
          <h2>登出</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="token">Token</label><br />
              <input type="text" id="token" name="token" placeholder="Token" onChange={(e) => {
                setToken(e.target.value);
              }} />
            </div>
            <button type="button" onClick={signOut}>Sign Out</button>
          </div>
        </div>
      </div>
      {/* <table>
        <thead>
          <tr>
            <th>
              <h2>註冊</h2>
            </th>
            <th>
              <h2>登入</h2>
            </th>
            <th>
              <h2>驗證</h2>
            </th>
            <th>
              <h2>登出</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="email">Email</label><br />
              <input type="email" id="email" name="email" placeholder="Email" onChange={handleInput} />
            </td>
            <td>
              <label htmlFor="email">Email</label><br />
              <input type="email" id="email" name="email" placeholder="Email" onChange={handleInput} />
            </td>
            <td>
              <label htmlFor="token">Token</label><br />
              <input type="text" id="token" name="token" placeholder="Token" onChange={handleInput} />
            </td>
            <td>
              <label htmlFor="token">Token</label><br />
              <input type="text" id="token" name="token" placeholder="Token" onChange={handleInput} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Password</label><br />
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleInput} />
            </td>
            <td>
              <label htmlFor="password">Password</label><br />
              <input type="password" id="password" name="password" placeholder="Password" onChange={handleInput} />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <label htmlFor="nickname">Nickname</label><br />
              <input type="text" id="nickname" name="nickname" placeholder="Nickname" onChange={handleInput} />
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={() => {
                signUp()
              }}>Sign Up</button>
            </td>
            <td>
              <button type="button" onClick={() => 1}>Sign In</button>
            </td>
            <td>
              <button type="button" onClick={() => 1}>Check Out</button>
            </td>
            <td>
              <button type="button" onClick={() => 1}>Sign Out</button>
            </td>
          </tr>
        </tbody>
      </table> */}
      <hr />

      <h2>Todo List</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="addTodo">New Todo</label><br />
              <input type="text" id="addTodo" placeholder="New todo" />
            </td>
            <td>
              <label htmlFor="change">Change</label><br />
              <input type="text" id="change" placeholder="Change the value" />
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={() => 1}>Add Todo</button>
            </td>
            <td>
              <button type="button" onClick={() => 1}>Delete</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="button" onClick={() => 1}>Updata</button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="button" onClick={() => 1}>Toggle Status</button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <h2>註冊</h2>
      <label htmlFor="email">Email：</label>
      <input type="email" id="email" placeholder="Email" />
      <label htmlFor="password">Password：</label>
      <input type="password" id="password" placeholder="Password" />
      <label htmlFor="nickname">Nickname：</label>
      <input type="text" id="nickname" placeholder="Nickname" />
      <button type="button" onClick={() => 1}>Sign Up</button>
      <h2>登入</h2>
      <label htmlFor="email">Email：</label>
      <input type="email" id="email" placeholder="Email" />
      <label htmlFor="password">Password：</label>
      <input type="password" id="password" placeholder="Password" />
      <button type="button" onClick={() => 1}>Sign In</button>
      <h2>驗證</h2>
      <label htmlFor="token">Token：</label>
      <input type="text" id="token" placeholder="Token" />
      <button type="button" onClick={() => 1}>Check Out</button>
      <h2>登出</h2>
      <label htmlFor="token">Token：</label>
      <input type="text" id="token" placeholder="Token" />
      <button type="button" onClick={() => 1}>Sign Out</button>
      <hr />
      <h1>Todo List</h1>
      <label htmlFor="addTodo">New Todo：</label>
      <input type="text" id="addTodo" placeholder="New todo" />
      <button type="button" onClick={() => 1}>Add Todo</button>
      <label htmlFor="change">Change：</label>
      <input type="text" id="change" placeholder="Change the value" />
      <button type="button" onClick={() => 1}>Delete</button>
      <button type="button" onClick={() => 1}>Updata</button>
      <button type="button" onClick={() => 1}>Toggle Status</button> */}
    </>
  )
}

export default Todo
