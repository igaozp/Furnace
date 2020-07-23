import com.google.common.base.Function;
import com.google.common.collect.Multimap;
import com.google.common.collect.Multimaps;
import org.checkerframework.checker.nullness.qual.Nullable;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public class MultimapExample {

    static class Data {
        private Integer id;

        private LocalDateTime createTime;

        public Data(Integer id, LocalDateTime createTime) {
            this.id = id;
            this.createTime = createTime;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public void setCreateTime(LocalDateTime createTime) {
            this.createTime = createTime;
        }

        public Integer getId() {
            return id;
        }

        public LocalDateTime getCreateTime() {
            return createTime;
        }

        @Override
        public String toString() {
            return "id: " + id + ", createTime: " + createTime + "\n" ;
        }
    }

    // test with Java 14
    public static void main(String[] args) {
        // generate random data
        Collection<Data> collection = new ArrayList<>(Collections.emptyList());
        for (int i = 0; i < 10; i++) {
            collection.add(new Data(i, LocalDateTime.now().plusMonths(i)));
        }
        System.out.println(collection);

        // Data convert to Month function
        java.util.function.Function<Data, @Nullable Month> function = new Function<>() {
            @Nullable
            @Override
            public Month apply(@Nullable Data data) {
                if (data == null) {
                    return null;
                }
                return data.getCreateTime().getMonth();
            }
        };

        Multimap<Month, Data> result = Multimaps.index(collection, function::apply);
        System.out.println(result.asMap());
    }
}
