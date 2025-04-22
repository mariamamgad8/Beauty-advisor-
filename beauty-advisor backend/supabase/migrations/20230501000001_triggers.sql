-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp on profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, username, age, gender)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(gen_random_uuid()::text, 1, 8)),
    COALESCE((NEW.raw_user_meta_data->>'age')::integer, 25),
    COALESCE((NEW.raw_user_meta_data->>'gender')::gender_type, 'other')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create profile after user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- Function to mark recommendation session as completed
CREATE OR REPLACE FUNCTION mark_session_completed()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE recommendation_sessions
  SET 
    status = 'completed',
    completed_at = NOW()
  WHERE id = NEW.session_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to mark session completed when recommendation is created
CREATE TRIGGER on_recommendation_created
AFTER INSERT ON recommendations
FOR EACH ROW
EXECUTE FUNCTION mark_session_completed();

