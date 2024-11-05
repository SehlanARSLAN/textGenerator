import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [numParagraphs, setNumParagraphs] = useState(4);
  const [selectedFormat, setSelectedFormat] = useState("text");

  useEffect(() => {
    fetchParagraphs(numParagraphs);
  }, [numParagraphs]);

  const fetchParagraphs = async (num) => {
    const response = await fetch(
      `https://baconipsum.com/api/?type=all-meat&paras=${num}`
    );
    const data = await response.json();
    setParagraphs(data);
  };

  const renderParagraphs = () => {
    return paragraphs.map((paragraph, index) => (
      <div key={index} className="paragraph">
        {selectedFormat === "text" ? paragraph : `<p>${paragraph}</p>`}
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Paragraf Oluşturucu</h1>
      <div className="controls">
        <div>
          <label>
            Paragraf Sayısı:
            <input
              type="number"
              value={numParagraphs}
              onChange={(e) => setNumParagraphs(Number(e.target.value))}
              min="1"
            />
          </label>
        </div>
        <div>
          <label>
            Gösterim Formatı:
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="html">HTML</option>
            </select>
          </label>
        </div>
      </div>

      <div className="paragraphs">{renderParagraphs()}</div>
    </div>
  );
};

export default App;
