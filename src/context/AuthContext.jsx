import { createContext, useState, useContext, useEffect } from 'react';
import { app } from '../firebase/firebase';

//AuthContext.jsxはContextでユーザ情報を含むuserを共有する為のjsxファイル。
//AuthContextを使えばuserとloadingの値をchildren部分にに読み込ませることができる。
//またuseAuthContext()とAuthProvider()を使い分けている。

// https://qiita.com/seira/items/fccdf4e73c59c491558d ←これ見ろ。(useState,useEffectとかいろいろ書いてる)

// コンテキスト(Context)を使うメリットは下記の3点ある。コンテキストを使うことでUIとロジックが分離することができるのでより開発しやすいコードになる。
// 複数コンポーネントで同じステートを簡単に操作できる
// ステート、イベントハンドラを一元管理できる
// 親コンポーネントから子、孫コンポーネントへプロップスを使って渡す必要がなくなる

// ていうかuseContextとは...?
// useContext()が出る前は、バケツリレーの形でcontextをpropsとして渡していた。
// しかし、useContext()を使用することで、contextの値に直接アクセスできる。
// https://zenn.dev/web_tips/articles/851557606491f3

//contextを作ったやつが偉い。
const AuthContext = createContext();

//contextを使うやつは下。
export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    loading,
  };

  //useEffectの意味を理解する。
  // useEffect(() => {
  //   /* 第1引数には実行させたい副作用関数を記述*/
  //   console.log('副作用関数が実行されました！')
  // },[依存する変数の配列]) // 第2引数には副作用関数の実行タイミングを制御する依存データを記述
  // 副作用関数とは、同じ様に呼び出しても同じ結果が返ってくるとは限らない処理のこと
  // https://zenn.dev/web_tips/articles/795b2a85fd2d97

  useEffect(() => {
    const unsubscribed = app.onAuthStateChanged((user) => {
      //firebaseでuser情報の更新をするまではまだloadingするみたいな機能？
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    // ※ProviderはcreateContext,useContextを使った時に必ず使う。
    // ~~Context.Providerは必ずvalue={~~}がいる。
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
