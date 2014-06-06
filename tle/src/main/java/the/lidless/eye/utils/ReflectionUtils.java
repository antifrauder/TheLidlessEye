package the.lidless.eye.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.LinkedList;
import java.util.List;

public class ReflectionUtils {

	public static List<String> getPublicStaticFieldNames(final Class<?> clazz) {
		if (clazz == null)
			return null;

		List<String> publicStaticFieldNames = new LinkedList<>();
		for (Field curField : clazz.getFields()) {
			if (Modifier.isStatic(curField.getModifiers())) {
				publicStaticFieldNames.add(curField.getName());
			}
		}
		return publicStaticFieldNames;
	}

	public static List<Object> getPublicStaticFieldValues(final Class<?> clazz) {
		if (clazz == null)
			return null;

		List<Object> publicStaticFieldNames = new LinkedList<>();
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

	public static String getPublicStaticFieldValue(final Class<?> clazz, final String fieldName) {
		if ((clazz == null) || (fieldName == null))
			return null;
		try {
			Field entityNameField = clazz.getField(fieldName);
			return (String) entityNameField.get(null);
		} catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException e) {
			return null;
		}
	}


}
