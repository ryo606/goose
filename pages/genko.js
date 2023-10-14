import { useState } from 'react';
import '../styles/globals.css';



export default function Home() {
    const [text, setText] = useState('');
    const [gridSize, setGridSize] = useState({ rows: 10, columns: 10 });
    const [convertedText, setConvertedText] = useState('');

    function convertToManuscript(inputText, gridSize) {
        const rows = gridSize.rows;
        const columns = gridSize.columns;
        const lines = inputText.split('\n');
    
        let result = [];
        let currentPage = [];
    
        for (let line of lines) {
            // 現在の行をサブラインに分割する
            const subLines = [];
            while (line.length) {
                let chunk = line.slice(0, columns);
                // 行の最初が「。」や「、」で、subLinesに既にデータがある場合
                if ((chunk.startsWith('。') || chunk.startsWith('、')) && subLines.length > 0) {
                    subLines[subLines.length - 1] += chunk.charAt(0);  // 前の行に追加
                    chunk = chunk.slice(1);  // 最初の文字を削除
                }
                subLines.push(chunk);
                line = line.slice(columns);
            }
    
            for (let subLine of subLines) {
                if (currentPage.length < rows) {
                    currentPage.push(subLine);
                } else {
                    result.push(currentPage);
                    currentPage = [subLine];
                }
            }
        }
    
        if (currentPage.length > 0) {
            result.push(currentPage);
        }
    
        return result.map(page => page.join('\n')).join('\n\n--- 新しいページ ---\n\n');
    }
    
    return (
        <div>
            <textarea onChange={e => setText(e.target.value)} value={text} placeholder="こちらに文章を入力してください"></textarea>
    
            <label>文字数/行: 
                <select value={gridSize.columns} onChange={e => setGridSize(prev => ({ ...prev, columns: parseInt(e.target.value) }))}>
                    {[...Array(30).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </label>

            <label>行数: 
                <select value={gridSize.rows} onChange={e => setGridSize(prev => ({ ...prev, rows: parseInt(e.target.value) }))}>
                    {[...Array(30).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </label>
    

            
            <button onClick={() => setConvertedText(convertToManuscript(text, gridSize))}>変換</button>
    
            <div className="manuscript">
                {/* こちらに変換された文章を表示 */}
                {convertedText.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        </div>
    );
}
