document.addEventListener('DOMContentLoaded', function() {
    const userName = document.getElementById('userName');
    const displayName = document.getElementById('displayName');
    const profileImage = document.getElementById('profileImage');
    const profilePreview = document.getElementById('profilePreview');
    const tweetText = document.getElementById('tweetText');
    const tweetTime = document.getElementById('tweetTime');
    const replyCount = document.getElementById('replyCount');
    const retweetCount = document.getElementById('retweetCount');
    const likeCount = document.getElementById('likeCount');
    const viewCount = document.getElementById('viewCount');
    const bookmarkCount = document.getElementById('bookmarkCount');
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const tweetPreview = document.getElementById('tweetPreview');
    
    const previewProfilePic = document.getElementById('previewProfilePic');
    const previewDisplayName = document.getElementById('previewDisplayName');
    const previewUserName = document.getElementById('previewUserName');
    const previewContent = document.getElementById('previewContent');
    const previewReplyCount = document.getElementById('previewReplyCount');
    const previewRetweetCount = document.getElementById('previewRetweetCount');
    const previewLikeCount = document.getElementById('previewLikeCount');
    const previewBookmarkCount = document.getElementById('previewBookmarkCount');
    
    let uploadedImageUrl = null;
    
    // Set default time to now
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    tweetTime.value = now.toISOString().slice(0, 16);
    
    // Profile image upload handler
    profileImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImageUrl = e.target.result;
                profilePreview.style.backgroundImage = `url(${uploadedImageUrl})`;
                profilePreview.classList.add('active');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Theme switcher
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'dark') {
                tweetPreview.classList.remove('light-theme');
                tweetPreview.classList.add('dark-theme');
            } else {
                tweetPreview.classList.remove('dark-theme');
                tweetPreview.classList.add('light-theme');
            }
        });
    });
    
    // Format numbers (Japanese style)
    function formatNumber(num, isView = false) {
        if (!num || num === '0') return '';
        num = parseInt(num);
        
        if (isView) {
            // 表示回数は「万回表示」形式
            if (num >= 10000) {
                return (num / 10000).toFixed(1).replace(/\.0$/, '') + '万回表示';
            }
            return num.toLocaleString() + '回表示';
        }
        
        // その他は「万」「億」形式
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1).replace(/\.0$/, '') + '億';
        }
        if (num >= 10000) {
            return (num / 10000).toFixed(1).replace(/\.0$/, '') + '万';
        }
        return num.toLocaleString();
    }
    
    // Format time for timestamp
    function formatTime(dateTimeStr) {
        if (!dateTimeStr) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            return `${hours}:${minutes} · ${year}/${month}/${day}`;
        }
        
        const tweetDate = new Date(dateTimeStr);
        const hours = tweetDate.getHours().toString().padStart(2, '0');
        const minutes = tweetDate.getMinutes().toString().padStart(2, '0');
        const year = tweetDate.getFullYear();
        const month = (tweetDate.getMonth() + 1).toString().padStart(2, '0');
        const day = tweetDate.getDate().toString().padStart(2, '0');
        
        return `${hours}:${minutes} · ${year}/${month}/${day}`;
    }
    
    // Generate preview
    generateBtn.addEventListener('click', function() {
        // Update profile picture
        if (uploadedImageUrl) {
            previewProfilePic.innerHTML = `<img src="${uploadedImageUrl}" alt="Profile">`;
        } else {
            previewProfilePic.innerHTML = `
                <svg viewBox="0 0 24 24" class="default-avatar">
                    <g>
                        <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                    </g>
                </svg>
            `;
        }
        
        // Update text content
        previewDisplayName.textContent = displayName.value || '表示名';
        previewUserName.textContent = userName.value || '@username';
        previewContent.textContent = tweetText.value || 'ここにポスト内容が表示されます';
        
        // Update timestamp
        const timestamp = document.getElementById('previewTime');
        const viewCountElem = document.getElementById('previewViewCount');
        timestamp.textContent = formatTime(tweetTime.value);
        viewCountElem.textContent = formatNumber(viewCount.value, true) || '0回表示';
        
        // Update stats
        previewReplyCount.textContent = formatNumber(replyCount.value);
        previewRetweetCount.textContent = formatNumber(retweetCount.value);
        previewLikeCount.textContent = formatNumber(likeCount.value);
        previewBookmarkCount.textContent = formatNumber(bookmarkCount.value);
        
        // Scroll to preview
        document.querySelector('.preview-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Save as image
    saveBtn.addEventListener('click', function() {
        html2canvas(tweetPreview, {
            backgroundColor: null,
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `x-post-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});