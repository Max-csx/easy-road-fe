import { IconFont } from "@nutui/icons-react-taro";
import React, { ReactHTML } from "react";
interface IconFontProps {
  name?: string;
  size?: string | number;
  width?: string | number;
  height?: string | number;
  classPrefix?: string;
  color?: string;
  tag?: keyof ReactHTML;
  onClick?: (e: MouseEvent) => void;
  fontClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
const defaultProps = {
  color: "#999",
  classPrefix: "icon",
  fontClassName: "iconfont",
};

const IconFontComp = (props: IconFontProps) => {
  return <IconFont {...(defaultProps || {})} {...(props || {})} />;
};
export default IconFontComp;
