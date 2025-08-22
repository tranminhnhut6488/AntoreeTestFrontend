import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const PopoverComponent = ({ roleUser, anchorRef, onClose, onLogout, onCheckListStudent, onCheckListTeacher }) => {
    const popoverRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPos({
                top: rect.bottom + window.scrollY + 6,
                left: rect.right + window.scrollX - 150,
                width: rect.width,
            });
        }
    }, [anchorRef]);

    useEffect(() => {
        const handler = (e) => {
            if (
                anchorRef.current &&
                !anchorRef.current.contains(e.target) &&
                popoverRef.current &&
                !popoverRef.current.contains(e.target)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [anchorRef, onClose]);

    return ReactDOM.createPortal(
        <div
            ref={popoverRef}
            style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                minWidth: "150px",
                zIndex: 600,
            }}
        >
            {roleUser === 'student' &&
                (<div
                    style={{
                        padding: "8px 16px",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    onClick={() => {
                        onCheckListStudent();
                        onClose();
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    Danh sách khóa học
                </div>)
            }
            {roleUser === 'teacher' &&
                (<div
                    style={{
                        padding: "8px 16px",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    onClick={() => {
                        onCheckListTeacher();
                        onClose();
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    Quản lý danh sách học viên
                </div>)
            }
            <div
                style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                }}
                onClick={() => {
                    onLogout();
                    onClose();
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
                Đăng xuất
            </div>
        </div>,
        document.body
    );
};

export default PopoverComponent;
