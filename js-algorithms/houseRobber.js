var rob = function(nums) {

    if( nums == null || nums.length == 0) {
        return 0
    }

    dp = []
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])

    for (let i = 2; i < nums.length; i++){
        dp[i] = Math.max(dp[i-1], nums[i] + dp[i-2])
    }

    return dp[nums.length - 1]

};
