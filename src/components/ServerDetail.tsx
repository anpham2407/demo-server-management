import React from "react";
import { Icon } from "@iconify/react";

interface ServerInfo {
  id: string;
  name: string;
  ip: string;
  status: "active" | "inactive" | "maintenance";
  sshKey: string;
  firewallEnabled: boolean;
  os: string;
  cpu: string;
  ram: string;
  createdAt: string;
}

interface ServerDetailProps {
  server: ServerInfo;
}

const statusColors: Record<ServerInfo["status"], string> = {
  active: "#22c55e",       // green
  inactive: "#6b7280",     // gray
  maintenance: "#eab308",  // yellow
};

const ServerDetail: React.FC<ServerDetailProps> = ({ server }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    // maxWidth: "800px",
    margin: "20px auto",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    color: "#0ea5e9",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "8px 0",
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "20px",
    minWidth: "24px",
    marginTop: "2px",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: "bold",
    display: "block",
  };

  const valueStyle: React.CSSProperties = {
    wordBreak: "break-word",
  };

  return (
    <div style={cardStyle}>
      <h2 style={headerStyle}>
        <Icon icon="solar:server-broken-bold" style={{ marginRight: "8px", fontSize: "24px" }} />
        {server.name}
      </h2>

      <div style={gridStyle}>
        <div>
          <div style={rowStyle}>
            <Icon icon="mdi:ip" style={{ ...iconStyle, color: "#3b82f6" }} />
            <div>
              <span style={labelStyle}>Địa chỉ IP:</span>
              <span style={valueStyle}>{server.ip}</span>
            </div>
          </div>

          <div style={rowStyle}>
            <Icon icon="material-symbols:circle" style={{ ...iconStyle, color: statusColors[server.status] }} />
            <div>
              <span style={labelStyle}>Trạng thái:</span>
              <span style={{ color: statusColors[server.status] }}>
                {server.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div style={rowStyle}>
            <Icon icon="mdi:ubuntu" style={{ ...iconStyle, color: "#f97316" }} />
            <div>
              <span style={labelStyle}>Hệ điều hành:</span>
              <span style={valueStyle}>{server.os}</span>
            </div>
          </div>

          <div style={rowStyle}>
            <Icon icon="mdi:cpu-64-bit" style={{ ...iconStyle, color: "#0f766e" }} />
            <div>
              <span style={labelStyle}>CPU:</span>
              <span style={valueStyle}>{server.cpu}</span>
            </div>
          </div>
        </div>

        <div>
          <div style={rowStyle}>
            <Icon icon="mdi:memory" style={{ ...iconStyle, color: "#10b981" }} />
            <div>
              <span style={labelStyle}>RAM:</span>
              <span style={valueStyle}>{server.ram}</span>
            </div>
          </div>

          <div style={rowStyle}>
            <Icon
              icon={server.firewallEnabled ? "carbon:firewall" : "mdi:fire-off"}
              style={{
                ...iconStyle,
                color: server.firewallEnabled ? "#ef4444" : "#9ca3af",
              }}
            />
            <div>
              <span style={labelStyle}>Firewall:</span>
              <span>{server.firewallEnabled ? "Đang bật" : "Đã tắt"}</span>
            </div>
          </div>

          <div style={rowStyle}>
            <Icon icon="mdi:calendar-clock" style={{ ...iconStyle, color: "#6366f1" }} />
            <div>
              <span style={labelStyle}>Ngày tạo:</span>
              <span>{new Date(server.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div style={rowStyle}>
            <Icon icon="material-symbols:vpn-key" style={{ ...iconStyle, color: "#8b5cf6" }} />
            <div>
              <span style={labelStyle}>SSH Key:</span>
              <code style={{ ...valueStyle, fontSize: "12px" }}>{server.sshKey}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerDetail;
