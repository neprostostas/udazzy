<template>
  <span v-if="gender === 'male'" class="gender-icon male">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="url(#paint0_linear_1115_10544)"/>
      <path d="M12.9231 3.07715V6.46176H12V4.66176L9.16924 7.47715C9.38463 7.77458 9.55129 8.10023 9.66924 8.45407C9.78719 8.80792 9.84617 9.16946 9.84617 9.53869C9.84617 10.4823 9.51796 11.2823 8.86155 11.9387C8.20514 12.5951 7.40514 12.9233 6.46155 12.9233C5.51796 12.9233 4.71796 12.5951 4.06155 11.9387C3.40514 11.2823 3.07693 10.4823 3.07693 9.53869C3.07693 8.5951 3.40514 7.7951 4.06155 7.13869C4.71796 6.48228 5.51796 6.15407 6.46155 6.15407C6.83078 6.15407 7.18976 6.21305 7.53847 6.33099C7.88719 6.44894 8.21027 6.61561 8.5077 6.831L11.3385 4.00023H9.53847V3.07715H12.9231ZM6.46155 7.07715C5.78463 7.07715 5.20514 7.31817 4.72309 7.80023C4.24104 8.28228 4.00001 8.86176 4.00001 9.53869C4.00001 10.2156 4.24104 10.7951 4.72309 11.2771C5.20514 11.7592 5.78463 12.0002 6.46155 12.0002C7.13847 12.0002 7.71796 11.7592 8.20001 11.2771C8.68206 10.7951 8.92309 10.2156 8.92309 9.53869C8.92309 8.86176 8.68206 8.28228 8.20001 7.80023C7.71796 7.31817 7.13847 7.07715 6.46155 7.07715Z" fill="white"/>
      <defs>
        <linearGradient id="paint0_linear_1115_10544" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
        <stop stop-color="#17A1FA"/>
        <stop offset="1" stop-color="#17A1FA" stop-opacity="0.62"/>
      </linearGradient>
      </defs>
    </svg>

  </span>
  <span v-else-if="gender === 'female'" class="gender-icon female">
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="url(#paint0_linear_1115_10547)"/>
      <path
          d="M7.58041 12.5876V11.4688H6.46153V10.6296H7.58041V9.20302C6.81584 9.10046 6.18181 8.7578 5.67831 8.17505C5.17481 7.5923 4.92307 6.91398 4.92307 6.14009C4.92307 5.2916 5.22376 4.56899 5.82516 3.97225C6.42656 3.37552 7.1515 3.07715 7.99999 3.07715C8.84847 3.07715 9.57341 3.37552 10.1748 3.97225C10.7762 4.56899 11.0769 5.2916 11.0769 6.14009C11.0769 6.91398 10.8252 7.5923 10.3217 8.17505C9.81817 8.7578 9.18414 9.10046 8.41957 9.20302V10.6296H9.53845V11.4688H8.41957V12.5876H7.58041ZM7.99999 8.39183C8.61537 8.39183 9.14218 8.17272 9.58041 7.73449C10.0186 7.29626 10.2378 6.76946 10.2378 6.15407C10.2378 5.53869 10.0186 5.01188 9.58041 4.57365C9.14218 4.13542 8.61537 3.91631 7.99999 3.91631C7.3846 3.91631 6.8578 4.13542 6.41957 4.57365C5.98134 5.01188 5.76223 5.53869 5.76223 6.15407C5.76223 6.76946 5.98134 7.29626 6.41957 7.73449C6.8578 8.17272 7.3846 8.39183 7.99999 8.39183Z"
          fill="white"/>
        <defs>
          <linearGradient id="paint0_linear_1115_10547" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E46A8F"/>
            <stop offset="1" stop-color="#E46A8F" stop-opacity="0.46"/>
          </linearGradient>
        </defs>
    </svg>
  </span>
  <span v-else-if="gender === 'other'" class="gender-icon other">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="url(#paint0_linear_1115_10551)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.58065 4.69922V6.96495C6.81608 7.06752 6.18205 7.41017 5.67855 7.99292C5.17506 8.57568 4.92331 9.254 4.92331 10.0279C4.92331 10.8764 5.22401 11.599 5.82541 12.1957C6.42681 12.7925 7.15175 13.0908 8.00023 13.0908C8.84872 13.0908 9.57366 12.7925 10.1751 12.1957C10.7765 11.599 11.0772 10.8764 11.0772 10.0279C11.0772 9.254 10.8254 8.57568 10.3219 7.99292C9.81841 7.41017 9.18438 7.06752 8.41981 6.96495V4.69922H7.58065ZM6.41981 8.43348C6.85804 7.99526 7.38485 7.77614 8.00023 7.77614C8.61562 7.77614 9.14242 7.99526 9.58065 8.43348C10.0189 8.87171 10.238 9.39852 10.238 10.0139C10.238 10.6293 10.0189 11.1561 9.58065 11.5943C9.14242 12.0326 8.61562 12.2517 8.00023 12.2517C7.38485 12.2517 6.85804 12.0326 6.41981 11.5943C5.98158 11.1561 5.76247 10.6293 5.76247 10.0139C5.76247 9.39852 5.98158 8.87171 6.41981 8.43348Z" fill="white"/>
      <path d="M7.31238 6.20062L6.73026 5.8831L7.4535 4.6483H6.0423V3.99562H7.4535L6.73026 2.77846L7.31238 2.46094L8.00034 3.6781L8.6883 2.46094L9.27042 2.77846L8.54718 3.99562H9.95838V4.6483H8.54718L9.27042 5.8831L8.6883 6.20062L8.00034 4.98346L7.31238 6.20062Z" fill="white"/>
      <defs>
      <linearGradient id="paint0_linear_1115_10551" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
      <stop stop-color="#9A5FFC"/>
      <stop offset="1" stop-color="#9A5FFC" stop-opacity="0.46"/>
      </linearGradient>
      </defs>
    </svg>
  </span>
  <span v-else class="gender-icon other2">
    <svg viewBox="-3 1 24 24">
        <path fill="currentColor"
              d="M12 2C13.11 2 14 2.9 14 4S13.11 6 12 6 10 5.11 10 4 10.9 2 12 2M13.91 8.41C13.66 7.59 12.9 7 12 7H10.5C9.4 7 8.5 7.9 8.5 9V14.5H10V22H13.5V16H16.5L13.91 8.41Z"/>
    </svg>
  </span>
</template>

<script>

import {defineComponent} from "vue"

export default defineComponent({
  props: ['gender']
})
</script>

<style scoped>

.gender-icon {
  display: inline-block;
  max-height: 16px;
  max-width: 18px;
  min-height: 12px;
  min-width: 14px;
  padding-right: 2px;
  font-size: inherit;
  vertical-align: middle;
  margin-top: -2px;
}

.gender-icon svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.gender-icon {
  display: inline-block;
  margin-right: 4px;
}

.male {
  color: #2b86a9;
}

.female {
  color: #ff7ad1;
}

.other {
  color: #969451;
}

.other2 {
  color: #969451;
}

</style>