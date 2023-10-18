<template>
    <nav class="bottom-navbar">
      <div class="inner-wrapper">

        <router-link to="/events" class="nav-item">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.347459 6.56021L9.16686 0.24703C9.62699 -0.082343 10.373 -0.0823433 10.8331 0.24703L19.6525 6.56021C20.3948 7.09153 19.8691 8 18.8194 8H18V17C18 17.5523 17.5523 18 17 18H13C12.4477 18 12 17.5523 12 17L12 13C12 12.4477 11.5523 12 11 12H9C8.44772 12 8 12.4477 8 13V17C8 17.5523 7.55228 18 7 18H3C2.44772 18 2 17.5523 2 17L2 8H1.1806C0.130902 8 -0.394787 7.09153 0.347459 6.56021Z" fill="url(#paint0_linear_580_154)"/>
            <defs>
              <linearGradient id="paint0_linear_580_154" x1="10" y1="0" x2="10" y2="18" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white" stop-opacity="0.75"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Home</span>
        </router-link>

        <router-link to="/promoters" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.97015 1.13093C9.31124 0.156877 10.6888 0.156876 11.0299 1.13093L12.7642 6.08371C12.9019 6.47688 13.2689 6.74351 13.6853 6.75295L18.9316 6.87192C19.9634 6.89531 20.3891 8.20542 19.5681 8.83082L15.3937 12.0108C15.0623 12.2632 14.9221 12.6946 15.0419 13.0936L16.5499 18.1199C16.8465 19.1084 15.7321 19.9181 14.8836 19.3306L10.5693 16.3431C10.2268 16.106 9.77319 16.106 9.43071 16.3431L5.11643 19.3306C4.26794 19.9181 3.1535 19.1084 3.45009 18.1199L4.95814 13.0936C5.07786 12.6946 4.93768 12.2632 4.6063 12.0108L0.431872 8.83082C-0.389106 8.20542 0.0365729 6.89531 1.06836 6.87192L6.31467 6.75295C6.73114 6.74351 7.09813 6.47688 7.23581 6.08371L8.97015 1.13093Z" fill="url(#paint0_linear_580_148)"/>
            <defs>
              <linearGradient id="paint0_linear_580_148" x1="10" y1="0.400391" x2="10" y2="19.5291" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white" stop-opacity="0.75"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Promoters</span>
        </router-link>

        <router-link to="/events" class="nav-item logo active">
          <div class="bg-wrapper">
            <img src="@/assets/img/logo/logo1.svg" alt="">
          </div>
        </router-link>

        <router-link to="/chats" class="nav-item">
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9352 16.8294C13.4791 17.5745 11.7948 18 10 18C4.47715 18 0 13.9706 0 9C0 4.02944 4.47715 0 10 0C15.5228 0 20 4.02944 20 9C20 11.0419 19.2444 12.925 17.9712 14.4352L18.9647 16.6706C19.334 17.5014 18.4927 18.354 17.657 17.9958L14.9352 16.8294ZM8.5 9C8.5 8.17157 9.17157 7.5 10 7.5C10.8284 7.5 11.5 8.17157 11.5 9C11.5 9.82843 10.8284 10.5 10 10.5C9.17157 10.5 8.5 9.82843 8.5 9ZM5 7.5C4.17157 7.5 3.5 8.17157 3.5 9C3.5 9.82843 4.17157 10.5 5 10.5C5.82843 10.5 6.5 9.82843 6.5 9C6.5 8.17157 5.82843 7.5 5 7.5ZM13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9Z" fill="url(#paint0_linear_580_150)"/>
            <defs>
              <linearGradient id="paint0_linear_580_150" x1="10" y1="0" x2="10" y2="18.0798" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white" stop-opacity="0.75"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Chat</span>
        </router-link>

        <router-link to="/profile" class="nav-item">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.9999 5C3.9999 2.23858 6.23847 0 8.9999 0C11.7613 0 13.9999 2.23858 13.9999 5C13.9999 7.76142 11.7613 10 8.9999 10C6.23847 10 3.9999 7.76142 3.9999 5Z" fill="url(#paint0_linear_580_152)"/>
            <path d="M8.9999 12C6.06528 12 3.42592 12.7585 1.59659 13.9665C-0.707727 15.4882 1.23847 18 3.9999 18H13.9999C16.7613 18 18.7075 15.4882 16.4032 13.9665C14.5739 12.7585 11.9345 12 8.9999 12Z" fill="url(#paint1_linear_580_152)"/>
            <defs>
              <linearGradient id="paint0_linear_580_152" x1="8.9999" y1="0" x2="8.9999" y2="18" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white" stop-opacity="0.75"/>
              </linearGradient>
              <linearGradient id="paint1_linear_580_152" x1="8.9999" y1="0" x2="8.9999" y2="18" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white" stop-opacity="0.75"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Profile</span>
        </router-link>

      </div>
    </nav>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent( {

})

</script>

<style>
  .bottom-navbar {
    position: fixed;
    z-index: 1001;
    bottom: 0;
    width: 100%;
    height: 80px;
    background: #151515;
    border-radius: 30px 30px 0 0;
    padding: 0 20px;
  }
  .bottom-navbar > .inner-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .nav-item {
    height: 100%;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .nav-item span,
  .nav-item svg path {
    transition: all .3s ease-out;
  }
  .nav-item span {
    margin-top: 5px;
    font-size: 10px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
  }

  .nav-item.router-link-active span {
    color: #F615ED;
  }
  .nav-item.router-link-active svg path {
    fill: #F615ED;
  }
  .nav-item.logo {
    width: 100px;
    min-width: 100px;
    padding: 3px 10px 5px 10px;
    transition: all .3s ease-out;
  }
  .nav-item.logo .bg-wrapper {
    background: #151515;
    border-radius: 50%;
    width: auto;
    height: 100%;
  }
  .nav-item.logo:not(.router-link-active) {
    transform: translate(0, -20px) scale(1.1);
  }
</style>