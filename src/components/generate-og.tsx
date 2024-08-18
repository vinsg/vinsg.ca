import { ImageResponse } from "@vercel/og";

export const generateOG = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const og = new ImageResponse(<OG title={title} subtitle={subtitle} />);
  return og;
};

const OG = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0e0b30",
        backgroundImage: "linear-gradient(160deg, #0e0b30 0%, #000 74%)",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingLeft: "50px",
          paddingRight: "50px",
          height: "25%",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            color: "hsl(240 3.8% 46.1%)",
            fontSize: "48px",
          }}
        >
          vinsg.ca
        </p>
      </div>
      <div
        style={{
          display: "flex",
          height: "75%",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "50px",
          lineHeight: "1",
        }}
      >
        <h3
          style={{
            fontSize: "56px",
            marginBottom: "30px",
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "hsl(240 3.8% 46.1%)",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};