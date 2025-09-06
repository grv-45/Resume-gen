// Select the clock hands
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

// Update clock every second
setInterval(() => {
    const date = new Date();          // Fixed: 'new date()' → 'new Date()'
    
    const htime = date.getHours();
    const mtime = date.getMinutes();  // Fixed: getMinute() → getMinutes()
    const stime = date.getSeconds();  // Fixed: getSecond() → getSeconds()
    
    // Calculate rotation angles
    const hrotation = 30 * (htime % 12) + mtime / 2;
    const mrotation = 6 * mtime;
    const srotation = 6 * stime;
    
    // Apply rotation to clock hands
    hour.style.transform = `translate(-50%, -100%) rotate(${hrotation}deg)`;
    minute.style.transform = `translate(-50%, -100%) rotate(${mrotation}deg)`;
    second.style.transform = `translate(-50%, -100%) rotate(${srotation}deg)`;
}, 1000);
