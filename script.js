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
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const tweetPreview = document.getElementById('tweetPreview');
    
    const previewProfilePic = document.getElementById('previewProfilePic');
    const previewDisplayName = document.getElementById('previewDisplayName');
    const previewUserName = document.getElementById('previewUserName');
    const previewTime = document.getElementById('previewTime');
    const previewContent = document.getElementById('previewContent');
    const previewReplyCount = document.getElementById('previewReplyCount');
    const previewRetweetCount = document.getElementById('previewRetweetCount');
    const previewLikeCount = document.getElementById('previewLikeCount');
    const previewViewCount = document.getElementById('previewViewCount');
    
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
    
    // Format numbers
    function formatNumber(num) {
        if (!num || num === '0') return '';
        num = parseInt(num);
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    }
    
    // Format time
    function formatTime(dateTimeStr) {
        if (!dateTimeStr) return '・0分';
        
        const tweetDate = new Date(dateTimeStr);
        const now = new Date();
        const diffMs = now - tweetDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return '・今';
        if (diffMins < 60) return `・${diffMins}分`;
        if (diffHours < 24) return `・${diffHours}時間`;
        if (diffDays < 7) return `・${diffDays}日`;
        
        const month = tweetDate.getMonth() + 1;
        const day = tweetDate.getDate();
        return `・${month}月${day}日`;
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
        previewTime.textContent = formatTime(tweetTime.value);
        previewContent.textContent = tweetText.value || 'ここにポスト内容が表示されます';
        
        // Update stats
        previewReplyCount.textContent = formatNumber(replyCount.value);
        previewRetweetCount.textContent = formatNumber(retweetCount.value);
        previewLikeCount.textContent = formatNumber(likeCount.value);
        previewViewCount.textContent = formatNumber(viewCount.value);
        
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