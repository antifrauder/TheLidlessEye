package the.lidless.eye.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;


public class ReflectionUtils {

	public static List<Object> getPublicStaticFieldValues(final Class<?> clazz) {
		if (clazz == null)
			return null;

		List<Object> publicStaticFieldNames = new ArrayList<>();
		for (Field curField : clazz.getFields()) {
			if (Modifier.isStatic(curField.getModifiers())) {
				try {
					publicStaticFieldNames.add(curField.get(null));
				} catch (IllegalArgumentException | IllegalAccessException e) {
					//do nothing
				}
			}
		}
		return publicStaticFieldNames;
	}

	public static List<String> getPublicStaticStringFieldValues(final Class<?> clazz) {
		List<Object> values = getPublicStaticFieldValues(clazz);
		if (values == null)
			return null;
		
		List<String> stringValues = new ArrayList<>();
		for (Object curValAsObject : values) {
			if (curValAsObject instanceof String)
				stringValues.add((String) curValAsObject);
		}

		return stringValues;
	}

}
