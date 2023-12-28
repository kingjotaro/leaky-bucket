local keys = redis.call('KEYS', '*')

for i, key in ipairs(keys) do
    if key ~= ARGV[1] and key ~= ARGV[2] then
        redis.call('DEL', key)
    end
end

return "OK"
