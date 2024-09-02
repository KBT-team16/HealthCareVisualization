import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import Switch from "react-switch";
import { FaBell, FaRegBell } from "react-icons/fa";
import "./Complete.css"; // 추가된 부분

const SERVER_URL = "http://192.168.0.16:8080";

const Complete = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notificationTime, setNotificationTime] = useState("");
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("asdf");
  const initialRender = useRef(true);

  useEffect(() => {
    const checkServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          console.log("현재 서비서워커 상태:등록 성공");
        } catch (error) {
          console.log("현재 서비서워커 상태:등록 실패", error);
        }
      }

      if ("PushManager" in window) {
        console.log("Push API 지원됨");
      }

      const permission = Notification.permission;
      console.log("알림 권한 상태:", permission);
    };

    const serviceWorkerRegister = async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          "serviceWorker.js"
        );
        console.log("서비스워커 등록 성공");
      } catch (error) {
        console.log("서비스워커 등록 실패:", error);
      }
    };

    checkServiceWorker();
    serviceWorkerRegister();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    console.log(initialRender.current);
    if (isNotificationOn) {
      console.log(`Switch is now "ON"`);
      alertRegister();
      subscribe();
    } else {
      console.log(`Switch is now "OFF"`);
      unsubscribe();
    }
  }, [isNotificationOn]);

  const alertRegister = async () => {
    try {
      const permission = await window.Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission not granted for Notification");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribe = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/notification/vapid-public-key`
      );
      const vapidPublicKey = await response.text();
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      const registration = await navigator.serviceWorker.register(
        "/serviceWorker.js"
      );
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      await fetch(`${SERVER_URL}/notification/subscription`, {
        method: "POST",
        body: JSON.stringify({
          userId: currentUserId,
          time: notificationTime,
          subscription,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  const unsubscribe = async () => {
    await fetch(`${SERVER_URL}/notification/subscription`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUserId }),
    });
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSwitchChange = (checked) => {
    if (notificationTime) {
      setIsNotificationOn(checked);
    } else {
      alert("알림 시간을 먼저 설정하세요.");
    }
  };

  const handleTimeChange = (e) => {
    setNotificationTime(e.target.value);
  };

  return (
    <div className="complete">
      <button onClick={togglePopup} className="notification-bell">
        {isNotificationOn ? <FaBell size={23} /> : <FaRegBell size={23} />}
      </button>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>알림 설정</p>
            <Switch
              checked={isNotificationOn}
              onChange={handleSwitchChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
            />
          </div>
          <div>
            <input
              type="time"
              value={notificationTime}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Complete;
