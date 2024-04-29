ps aux | grep next | awk '{print $2;}' | xargs kill -9 2>/dev/null
