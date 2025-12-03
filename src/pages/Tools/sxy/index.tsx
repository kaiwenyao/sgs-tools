import { Grid, Button } from "@mui/material";
import { useState } from "react";
import "@/index.scss";
import "./index.scss";
const scrollList = [
  {
    id: 1,
    name: "顺手牵羊",
  },
  {
    id: 2,
    name: "过河拆桥",
  },
  {
    id: 3,
    name: "五谷丰登",
  },
  {
    id: 4,
    name: "无中生有",
  },
  {
    id: 5,
    name: "决斗",
  },
  {
    id: 6,
    name: "南蛮入侵",
  },
  {
    id: 7,
    name: "万箭齐发",
  },
  {
    id: 8,
    name: "闪电",
  },
  {
    id: 9,
    name: "桃园结义",
  },
  {
    id: 10,
    name: "无懈可击",
  },
  {
    id: 11,
    name: "借刀杀人",
  },
  {
    id: 12,
    name: "乐不思蜀",
  },
  {
    id: 13,
    name: "兵粮寸断",
  },
  {
    id: 14,
    name: "铁索连环",
  },
  {
    id: 15,
    name: "火攻",
  },
];
const optionList = [
  {
    id: 1,
    name: "奇兵",
  },
  {
    id: 2,
    name: "正兵",
  },
];
const Sxy = () => {
  const [selectedScrolls, setSelectedScrolls] = useState<number[]>([]);
  // 【关键点 2】处理点击的函数
  const handleToggle = (id: number) => {
    if (selectedScrolls.includes(id)) {
      // 这里的逻辑是：如果已经有了，就用 filter 把它过滤掉（取消选中）
      setSelectedScrolls(selectedScrolls.filter((item) => item !== id));
    } else {
      // 如果没有，就把它加进数组（选中）
      // ...selectedIds 是保留之前的，id 是新加的
      setSelectedScrolls([...selectedScrolls, id]);
    }
  };
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const handleClick = (id: number) => {
    setSelectedOption(id);
  };
  return (
    <div>
      <div className="scrollSelector">
        <Grid container spacing={1}>
          {scrollList.map((item) => {
            const isActive = selectedScrolls.includes(item.id);
            return (
              <Grid
                key={item.id}
                size={4}
                sx={{
                  textAlign: "center",
                }}
              >
                <Button
                  sx={{
                    width: "29vw",
                    fontFamily: "jinmeifanglishu",
                    fontSize: "5vw",
                    fontWeight: 900,
                    color: "black",
                    backgroundColor: isActive ? "#bba381ff" : "#9f9f9fff",
                    // backgroundColor: "#BCAF9A",
                  }}
                  onClick={() => handleToggle(item.id)}
                >
                  {item.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>

      <Grid container spacing={2}>
        {optionList.map((item) => {
          const isActive = item.id === selectedOption;
          return (
            <Grid
              key={item.id}
              size={6}
              sx={{
                textAlign: "center",
              }}
            >
              <Button
                sx={{
                  width: "35vw",
                  height: "35vw",
                  fontFamily: "jinmeifanglishu",
                  fontSize: "10vw",
                  fontWeight: 900,
                  color: "black",
                  backgroundColor: isActive ? "#bba381ff" : "#9f9f9fff",
                  // backgroundColor: "#BCAF9A",
                }}
                onClick={() => handleClick(item.id)}
              >
                {item.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Sxy;
