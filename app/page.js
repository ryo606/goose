"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const IndexPage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // ここでAPIからフォームのデータを取得する
    // この例ではダミーデータを使用
    const fetchData = async () => {
      const dummyData = [
        { id: '1', title: 'Form 1' },
        { id: '2', title: 'Form 2' },
      ];
      setForms(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My Forms</h1>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <Link href={`/forms/${form.id}`}>
              {form.title}
            </Link>
          </li>
        ))}
      </ul>
      {/* 新しいフォームを作成するページへのリンクを追加 */}
      <Link href="/NewFormPage">
        Create New Form
      </Link>
      {/* <br/>
      <br/>
      <Link href="/forms/1">Taro Yamada</Link>
      <br/>
      <br/>
      <Link href="/test">Taro</Link> */}
    </div>
  );
};

export default IndexPage;
