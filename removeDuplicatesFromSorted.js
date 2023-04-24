var removeDuplicates = function(nums) {
    const len = nums.length;
    for(i = 0; i < len - 1; i++) {
      if(i > nums.length - 1) {
        break;
      }
      if (nums[i] === nums[i + 1]) {
        nums.splice(i, 1);
        i--;
      }
    }
    return nums.length;
};